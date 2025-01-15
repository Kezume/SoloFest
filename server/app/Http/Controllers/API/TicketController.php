<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Mail\TicketEmail;
use App\Models\Event;
use App\Models\Purchase;
use App\Models\Ticket;
use Barryvdh\DomPDF\Facade\Pdf;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class TicketController extends Controller
{
    public function index($eventId)
    {
        $event = Event::find($eventId);

        if (!$event) {
            return response()->json([
                'message' => 'Event not found',
                'data' => null
            ], 404);
        }

        $tickets = $event->tickets;

        return response()->json([
            'message' => 'Tickets fetched successfully.',
            'data' => $tickets
        ]);
    }

    public function store(Request $request, $eventId)
    {
        $event = Event::find($eventId);

        if (!$event) {
            return response()->json([
                'message' => 'Event not found.',
                'data' => null
            ], 404);
        }

        $this->authorize('create', [Ticket::class, $event]);

        $validator = Validator::make($request->all(), [
            'type' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors.',
                'data' => $validator->errors()
            ], 422);
        }

        $ticketData = $validator->validated();

        $ticket = $event->tickets()->create($ticketData);

        return response()->json([
            'message' => 'Ticket created successfully.',
            'data' => $ticket
        ], 201);
    }

    public function update(Request $request, $eventId, $ticketId)
    {
        $ticket = Ticket::where('event_id', $eventId)->find($ticketId);

        if (!$ticket) {
            return response()->json([
                'message' => 'Ticket not found.',
                'data' => null
            ], 404);
        }

        // Cek otorisasi untuk mengupdate tiket
        $this->authorize('update', $ticket);

        $validator = Validator::make($request->all(), [
            'type' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric|min:0',
            'quantity' => 'sometimes|required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors.',
                'data' => $validator->errors()
            ], 422);
        }

        $ticket->update($validator->validated());

        return response()->json([
            'message' => 'Ticket updated successfully.',
            'data' => $ticket
        ]);
    }


    public function destroy($eventId, $ticketId)
    {
        $ticket = Ticket::where('event_id', $eventId)->find($ticketId);

        if (!$ticket) {
            return response()->json([
                'message' => 'Ticket not found.',
                'data' => null
            ], 404);
        }

        // Cek otorisasi untuk menghapus tiket
        $this->authorize('delete', $ticket);

        $ticket->delete();

        return response()->json([
            'message' => 'Ticket deleted successfully.',
            'data' => null
        ]);
    }
}
