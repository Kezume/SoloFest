<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Ticket;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::all(['id', 'name', 'description', 'location', 'start_date', 'end_date', 'image_url']);

        return response()->json([
            'message' => 'Daftar event berhasil diambil.',
            'data' => $events,
        ], 200);
    }

    public function show($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json([
                'message' => 'Event tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'message' => 'Detail event berhasil diambil.',
            'data' => [
                'id' => $event->id,
                'name' => $event->name,
                'description' => $event->description,
                'location' => $event->location,
                'start_date' => $event->start_date,
                'end_date' => $event->end_date,
                'image_url' => $event->image_url,
            ],
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'description' => 'nullable|max:1000',
            'location' => 'required|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validasi untuk gambar
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        Log::info('Request data:', $request->all());

        $imageUrl = null; // Default inisialisasi

        if ($request->hasFile('image')) {
            $uploadedFile = $request->file('image');

            try {
                // Pastikan konfigurasi Cloudinary valid
                $cloudinaryUrl = config('cloudinary.cloud_url');
                Log::info('Cloudinary URL:', ['url' => config('cloudinary.cloud_url')]);
                Log::info('Cloudinary Cloud Name:', ['cloud_name' => config('cloudinary.cloud_name')]);

                if (!$cloudinaryUrl) {
                    Log::error('Cloudinary URL is missing or null. Please check your configuration.');
                    return response()->json([
                        'message' => 'Cloudinary configuration is missing.',
                    ], 500);
                }

                $uploadResult = Cloudinary::upload($uploadedFile->getRealPath(), [
                    'folder' => 'events',
                ]);
                $imageUrl = $uploadResult->getSecurePath();
            } catch (\Exception $e) {
                Log::error('Cloudinary Upload Error: ' . $e->getMessage());
                return response()->json([
                    'message' => 'Terjadi kesalahan saat mengunggah gambar.',
                    'error' => $e->getMessage(),
                ], 500);
            }
        }

        // Simpan data event ke database
        $event = Event::create([
            'name' => $request->name,
            'description' => $request->description,
            'location' => $request->location,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'user_id' => auth()->id(),
            'image_url' => $imageUrl,
        ]);

        return response()->json([
            'message' => 'Event berhasil ditambahkan',
            'data' => $event,
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
