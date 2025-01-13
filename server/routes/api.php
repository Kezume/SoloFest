<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\EventCategoryController;
use App\Http\Controllers\API\EventController;
use App\Http\Controllers\API\PurchaseController;
use App\Http\Controllers\API\TicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('verify-otp', [AuthController::class, 'verifyOtp']);
    Route::post('refresh-otp', [AuthController::class, 'refreshOtp']);
});
Route::post('/midtrans/notification', [PurchaseController::class, 'handleNotification']);

Route::middleware(['middleware' => 'api'])->group(function () {
    Route::get('/users/profile', [AuthController::class, 'profile']);
    Route::put('/users/profile/update', [AuthController::class, 'update']);
    
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/tickets/{ticketId}/purchase', [PurchaseController::class, 'store']);
    Route::get('/purchases', [PurchaseController::class, 'index']);
});

Route::prefix('events')->group(function () {
    Route::get('/', [EventController::class, 'index']);
    Route::get('/{id}', [EventController::class, 'show']);
    Route::get('/category/{categoryId}', [EventController::class, 'getEventsByCategory']);
    Route::get('/{eventId}/tickets', [TicketController::class, 'index']);
    
    Route::middleware(['middleware' => 'api', 'role:admin,event_organizer'])->group(function () {
        Route::post('/', [EventController::class, 'store']);
        Route::put('/{id}', [EventController::class, 'update']);
        Route::delete('/{id}', [EventController::class, 'destroy']);
        
        Route::post('/{eventId}/tickets', [TicketController::class, 'store']);
        Route::put('/{eventId}/tickets/{ticketId}', [TicketController::class, 'update']);
        Route::delete('/{eventId}/tickets/{ticketId}', [TicketController::class, 'destroy']);
    });
});

Route::prefix('categories')->group(function () {
    Route::get('/', [EventCategoryController::class, 'index']); // Semua pengguna bisa melihat kategori
    Route::get('/{id}', [EventCategoryController::class, 'show']); // Semua pengguna bisa melihat detail kategori

    // Hanya admin yang bisa mengelola kategori
    Route::middleware(['middleware' => 'api', 'role:admin'])->group(function () {
        Route::post('/', [EventCategoryController::class, 'store']); // Tambah kategori
        Route::put('/{id}', [EventCategoryController::class, 'update']); // Update kategori
        Route::delete('/{id}', [EventCategoryController::class, 'destroy']); // Hapus kategori
    });
});

// Route::post('/events', [EventController::class, 'store']);
// Route::put('/events/{id}', [EventController::class, 'update']);
// Route::delete('/events/{id}', [EventController::class, 'destroy']);


// Route::post('/events/{eventId}/tickets', [TicketController::class, 'store']);
// Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);