<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\EventController;
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

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('/refresh-otp', [AuthController::class, 'refreshOtp']);

// Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/users/profile', [AuthController::class, 'profile']);

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/events', [EventController::class, 'index']);
    Route::get('/events/{id}', [EventController::class, 'show']);
    // Route::post('/events', [EventController::class, 'store']);
    // Route::put('/events/{id}', [EventController::class, 'update']);
    // Route::delete('/events/{id}', [EventController::class, 'destroy']);

    Route::get('/events/{eventId}/tickets', [TicketController::class, 'index']);
    // Route::post('/events/{eventId}/tickets', [TicketController::class, 'store']);
});

Route::middleware(['auth:sanctum', 'role:admin,event_organizer'])->group(function () {
    Route::post('/events', [EventController::class, 'store']);
    Route::put('/events/{id}', [EventController::class, 'update']);
    Route::delete('/events/{id}', [EventController::class, 'destroy']);

    Route::post('/events/{eventId}/tickets', [TicketController::class, 'store']);
    Route::put('/events/{eventId}/tickets/{ticketId}', [TicketController::class, 'update']);
    Route::delete('/events/{eventId}/tickets/{ticketId}', [TicketController::class, 'destroy']);
});

