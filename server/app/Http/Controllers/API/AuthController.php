<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'verifyOtp', 'refreshOtp']]);
    }

    public function register(Request $request)
    {
        $input = Validator::make($request->all(), [
            'username' => 'required|string|max:50|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'no_telp' => 'required|numeric|unique:users,no_telp',
            'password' => 'required|min:8|confirmed',
            'full_name' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'alamat_lengkap' => 'required|string|max:500',
            'kota_kabupaten' => 'required|string|max:100',
            'provinsi' => 'required|string|max:100',
            'kode_pos' => 'required|numeric',
            'role' => 'required|in:member,event_organizer,admin',
        ]);

        if ($input->fails()) {
            return response()->json([
                'message' => 'Ada Kesalahan!',
                'data' => $input->errors()
            ], 422);
        }

        $data = $request->all();
        $data['password'] = bcrypt($data['password']);
        $otp = rand(100000, 999999);

        // Buat user tanpa OTP
        $user = User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'no_telp' => $data['no_telp'],
            'password' => $data['password'],
            'name' => $data['full_name'],
            'tanggal_lahir' => $data['tanggal_lahir'],
            'jenis_kelamin' => $data['jenis_kelamin'],
            'alamat_lengkap' => $data['alamat_lengkap'],
            'kota_kabupaten' => $data['kota_kabupaten'],
            'provinsi' => $data['provinsi'],
            'kode_pos' => $data['kode_pos'],
            'role' => $data['role'],
            'otp' => $otp,
        ]);

        // Kirim email berisi OTP dengan tautan verifikasi
        Mail::send('emails.otp', ['otp' => $otp, 'user_id' => $user->id], function ($message) use ($data) {
            $message->to($data['email'])->subject('Kode OTP Verifikasi Anda');
        });

        return response()->json([
            'message' => 'Registrasi berhasil! Silakan cek email Anda untuk verifikasi OTP.',
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'identifier' => 'required',
            'password' => 'required|min:8'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors()
            ], 422);
        }

        $credentials = [];
        $user = User::where('email', $request->identifier)
            ->orWhere('username', $request->identifier)
            ->orWhere('no_telp', $request->identifier)
            ->first();

        if (!$user) {
            return response()->json([
                'message' => 'User tidak ditemukan!'
            ], 401);
        }

        $credentials['email'] = $user->email;
        $credentials['password'] = $request->password;

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json([
                'message' => 'Password salah!'
            ], 401);
        }

        return $this->respondWithToken($token);
    }

    public function logout()
    {
        auth('api')->logout();

        return response()->json([
            'message' => 'Logout berhasil!'
        ], 200);
    }

    

    protected function respondWithToken($token)
    {
        return response()->json([
            'message' => 'Login berhasil!',
            'data' => [
                'user' => auth('api')->user(),
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => config('jwt.ttl') * 60 // Gets TTL from config
            ]
        ]);
    }

    public function refresh()
    {
          try {
            $token = JWTAuth::parseToken()->refresh();
            return $this->respondWithToken($token);
        } catch (JWTException $e) {
            return response()->json([
                'message' => 'Could not refresh token',
                'error' => $e->getMessage()
            ], 401);
        }
    }

    public function profile()
    {
        return response()->json([
            'message' => 'User profile',
            'data' => auth('api')->user()
        ]);
    }

    public function verifyOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email', // Ubah validasi ke email
            'otp' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::where('email', $request->email)->first(); // Cari user berdasarkan email

        if (!$user || $request->otp != $user->otp) {
            return response()->json([
                'message' => 'OTP tidak valid.',
            ], 400);
        }

        $user->update([
            'email_verified_at' => now(),
            'otp' => null, // Hapus OTP setelah verifikasi
        ]);

        return response()->json([
            'message' => 'Email berhasil diverifikasi.',
        ], 200);
    }

    public function refreshOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::find($request->user_id);

        if (!$user) {
            return response()->json([
                'message' => 'User tidak ditemukan.',
            ], 404);
        }

        // Periksa apakah user sudah terverifikasi
        if ($user->email_verified_at) {
            return response()->json([
                'message' => 'Akun sudah diverifikasi. Tidak perlu OTP lagi.',
            ], 400);
        }

        // Periksa batasan waktu refresh OTP (misalnya 5 menit)
        if ($user->otp_created_at && $user->otp_created_at->diffInMinutes(now()) < 5) {
            return response()->json([
                'message' => 'Anda hanya dapat merefresh OTP setiap 5 menit.',
            ], 429);
        }

        // Generate OTP baru
        $otp = rand(100000, 999999);

        // Perbarui OTP di database
        $user->update([
            'otp' => $otp,
            'otp_created_at' => now(),
        ]);

        // Kirim email dengan OTP baru
        Mail::send('emails.otp', ['otp' => $otp, 'user_id' => $user->id], function ($message) use ($user) {
            $message->to($user->email)->subject('Kode OTP Verifikasi Anda (Refresh)');
        });

        return response()->json([
            'message' => 'Kode OTP baru telah dikirim ke email Anda.',
        ], 200);
    }
}
