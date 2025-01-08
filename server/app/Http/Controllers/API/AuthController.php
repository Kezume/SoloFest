<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
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
            'identifier' => 'required', // Bisa berupa email, username, atau nomor telepon
            'password' => 'required|min:8'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors()
            ], 402);
        }

        $user = User::where('email', $request->identifier)
            ->orWhere('username', $request->identifier)
            ->orWhere('no_telp', $request->identifier)
            ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Identifier atau Password salah!'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil!',
            'data' => [
                'user' => $user,
                'token' => $token
            ]
        ], 200);
    }

    public function update(Request $request)
    {
        $auth = Auth::user(); // Mendapatkan pengguna yang sedang login

        // Validasi data tanpa password
        $input = Validator::make($request->all(), [
            'username' => 'sometimes|required|string|max:50|unique:users,username,' . $auth->id,
            'email' => 'sometimes|required|email|unique:users,email,' . $auth->id,
            'no_telp' => 'sometimes|required|numeric|unique:users,no_telp,' . $auth->id,
            'full_name' => 'sometimes|required|string|max:255',
            'tanggal_lahir' => 'sometimes|required|date',
            'jenis_kelamin' => 'sometimes|required|in:Laki-laki,Perempuan',
            'alamat_lengkap' => 'sometimes|required|string|max:500',
            'kota_kabupaten' => 'sometimes|required|string|max:100',
            'provinsi' => 'sometimes|required|string|max:100',
            'kode_pos' => 'sometimes|required|numeric',
        ]);

        if ($input->fails()) {
            return response()->json([
                'message' => 'Ada Kesalahan!',
                'data' => $input->errors()
            ], 422);
        }

        // Validasi lolos
        $validatedData = $input->validated();

        // Update data pengguna tanpa password
        $auth->update($validatedData);

        return response()->json([
            'message' => 'Profil berhasil diperbarui!',
            'data' => $auth
        ], 200);
    }


    public function logout(Request $request)
    {
        $request->user()->Tokens()->delete();
        // $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout berhasil!'
        ], 200);
    }

    public function profile()
    {
        $profile = Auth::user();

        return response()->json([
            'message' => 'User profile',
            'data' => $profile
        ], 200);
    }

    public function verifyOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'otp' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::find($request->user_id);

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
