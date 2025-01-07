<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\EventCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EventCategoryController extends Controller
{
    public function index()
    {
        $categories = EventCategory::all(['id', 'name']);
        return response()->json([
            'message' => 'Daftar kategori event',
            'data' => $categories
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:event_categories,name|max:255',
            'description' => 'nullable|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $category = EventCategory::create($request->only(['name', 'description']));

        return response()->json([
            'message' => 'Kategori berhasil ditambahkan',
            'data' => $category
        ], 201);
    }

    public function show($id)
    {
        $category = EventCategory::find($id);

        if (!$category) {
            return response()->json([
                'message' => 'Kategori tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'message' => 'Detail kategori',
            'data' => $category
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $category = EventCategory::find($id);

        if (!$category) {
            return response()->json([
                'message' => 'Kategori tidak ditemukan'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:event_categories,name,' . $id . '|max:255',
            'description' => 'nullable|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $category->update($request->only(['name', 'description']));

        return response()->json([
            'message' => 'Kategori berhasil diperbarui',
            'data' => $category
        ], 200);
    }

    /**
     * Hapus kategori.
     */
    public function destroy($id)
    {
        $category = EventCategory::find($id);

        if (!$category) {
            return response()->json([
                'message' => 'Kategori tidak ditemukan'
            ], 404);
        }

        $category->delete();

        return response()->json([
            'message' => 'Kategori berhasil dihapus'
        ], 200);
    }
}
