<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    public function index()
    {
        // EO hanya melihat event mereka, Admin bisa melihat semua
        if (Auth::user()->role === 'event_organizer') {
            $events = Event::where('user_id', Auth::id())->with('organizer:id,name,email')->get();
        } else {
            $events = Event::with('organizer:id,name,email')->get();
        }

        return response()->json([
            'message' => 'Events fetched successfully.',
            'data' => $events
        ]);
    }

    public function show($id)
    {
        $event = Event::with('organizer:id,name,email')->find($id);

        if (!$event) {
            return response()->json([
                'message' => 'Event not found.',
                'data' => null
            ], 404);
        }

        // Pastikan EO hanya bisa melihat event mereka
        if (Auth::user()->role === 'event_organizer' && $event->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'You are not authorized to view this event.',
                'data' => null
            ], 403);
        }

        return response()->json([
            'message' => 'Event fetched successfully.',
            'data' => $event
        ]);
    }

    public function getEventsByCategory($categoryId)
    {
        $category = EventCategory::find($categoryId);

        if (!$category) {
            return response()->json([
                'message' => 'Kategori tidak ditemukan'
            ], 404);
        }

        $events = Event::where('category_id', $categoryId)->get();

        return response()->json([
            'message' => 'Daftar event berdasarkan kategori',
            'category' => $category->name,
            'data' => $events
        ], 200);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Event::class);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'location' => 'required|string|max:255',
            'category_id' => 'required|exists:event_categories,id', // Validasi kategori
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors.',
                'data' => $validator->errors()
            ], 422);
        }
        Log::info('Request data:', $request->all());

        $event = Event::create([
            'name' => $request->name,
            'description' => $request->description,
            'date' => $request->date,
            'location' => $request->location,
            'category_id' => $request->category_id, // Simpan kategori
            'user_id' => Auth::id(),
        ]);
        

        return response()->json([
            'message' => 'Event created successfully.',
            'data' => $event->load('organizer:id,name,email', 'category:id,name') // Muat kategori
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json([
                'message' => 'Event not found.',
                'data' => null
            ], 404);
        }

        $this->authorize('update', $event);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'sometimes|required|date',
            'location' => 'sometimes|required|string|max:255',
            'category_id' => 'sometimes|required|exists:event_categories,id', // Validasi kategori
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors.',
                'data' => $validator->errors()
            ], 422);
        }

        $event->update($validator->validated());

        return response()->json([
            'message' => 'Event updated successfully.',
            'data' => $event->load('organizer:id,name,email', 'category:id,name') // Muat kategori
        ]);
    }


    public function destroy($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json([
                'message' => 'Event not found.',
                'data' => null
            ], 404);
        }

        $this->authorize('delete', $event);

        $event->delete();

        return response()->json([
            'message' => 'Event deleted successfully.',
            'data' => null
        ]);
    }
}
