<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Purchase;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Midtrans\Config;
use Midtrans\Notification;
use Midtrans\Snap;

class PurchaseController extends Controller
{
    public function store(Request $request, $ticketId)
    {
        $ticket = Ticket::find($ticketId);

        if (!$ticket) {
            return response()->json([
                'message' => 'Ticket not found.',
                'data' => null
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'quantity' => 'required|integer|min:1|max:' . $ticket->quantity,
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors.',
                'data' => $validator->errors()
            ], 422);
        }

        $quantity = $request->quantity;
        $baseTotalPrice = $ticket->price * $quantity;

        // Hitung pajak layanan 2.5%
        $serviceTax = $baseTotalPrice * 0.025;

        // Total harga termasuk pajak
        $totalPrice = $baseTotalPrice + $serviceTax;

        // Kurangi stok tiket
        $ticket->decrement('quantity', $quantity);

        // Buat pembelian di database (status awal: pending)
        $purchase = Purchase::create([
            'ticket_id' => $ticket->id,
            'user_id' => Auth::id(),
            'quantity' => $quantity,
            'total_price' => $totalPrice,
            'status' => 'pending',
        ]);

        // Konfigurasi Midtrans
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');

        // Data transaksi untuk Midtrans
        $transactionDetails = [
            'order_id' => 'ORDER-' . $purchase->id,
            'gross_amount' => $totalPrice,
        ];

        $itemDetails = [
            [
                'id' => $ticket->id,
                'price' => $ticket->price,
                'quantity' => $quantity,
                'name' => 'Ticket ' . $ticket->event->name . '(' . $ticket->type . ')',
                // 'name' => $ticket->name,
            ],
            [
                'id' => 'Service Tax id ' . $ticket->id,
                'price' => $serviceTax,
                'quantity' => 1,
                'name' => 'Service tax (2.5%)',
                // 'name' => $ticket->name,
            ]
        ];

        $customerDetails = [
            'first_name' => Auth::user()->username,
            'email' => Auth::user()->email,
            'phone' => Auth::user()->no_telp,
        ];

        $midtransParams = [
            'transaction_details' => $transactionDetails,
            'item_details' => $itemDetails,
            'customer_details' => $customerDetails,
        ];

        try {
            $snapToken = Snap::getSnapToken($midtransParams);

            return response()->json([
                'message' => 'Transaction created. Complete payment using the provided Snap Token.',
                'data' => [
                    'purchase' => $purchase,
                    'snap_token' => $snapToken,
                ]
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create transaction.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function index()
    {
        $purchases = Auth::user()->purchases()->with('ticket.event')->get();

        return response()->json([
            'message' => 'Purchase history fetched successfully.',
            'data' => $purchases
        ]);
    }

    public function handleNotification(Request $request)
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');

        try {
            $notification = new Notification();

            $transactionStatus = $notification->transaction_status;
            $orderId = $notification->order_id;
            $fraudStatus = $notification->fraud_status;

            $purchaseId = str_replace('ORDER-', '', $orderId);
            $purchase = Purchase::find($purchaseId);

            if (!$purchase) {
                return response()->json(['message' => 'Purchase not found.'], 404);
            }

            if ($transactionStatus == 'capture' && $fraudStatus != 'challenge') {
                $purchase->status = 'paid';
                $purchase->ticket->decrement('quantity', $purchase->quantity);
            } elseif ($transactionStatus == 'settlement') {
                $purchase->status = 'paid';
                $purchase->ticket->decrement('quantity', $purchase->quantity);
            } elseif (in_array($transactionStatus, ['deny', 'expire', 'cancel'])) {
                $purchase->status = $transactionStatus;
                $purchase->ticket->increment('quantity', $purchase->quantity);
            } elseif ($transactionStatus == 'pending') {
                $purchase->status = 'pending';
            }

            $purchase->save();

            return response()->json(['message' => 'Notification handled successfully.'], 200);
        } catch (\Exception $e) {
            Log::error('Midtrans Notification Error: ' . $e->getMessage());

            return response()->json(['message' => 'Failed to handle notification.'], 500);
        }
    }
}
