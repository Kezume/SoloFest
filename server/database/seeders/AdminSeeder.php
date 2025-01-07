<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Member
        User::create([
            'username' => 'member123',
            'email' => 'member@example.com',
            'no_telp' => '081234567890',
            'password' => Hash::make('password123'),
            'name' => 'John Doe',
            'tanggal_lahir' => '1995-05-15',
            'jenis_kelamin' => 'Laki-laki',
            'alamat_lengkap' => 'Jl. Contoh Alamat No. 123',
            'kota_kabupaten' => 'Kota Jakarta',
            'provinsi' => 'DKI Jakarta',
            'kode_pos' => '12345',
            'otp' => '123456',
            'role' => 'member',
        ]);

        // Event Organizer
        User::create([
            'username' => 'organizer123',
            'email' => 'organizer@example.com',
            'no_telp' => '081234567891',
            'password' => Hash::make('password123'),
            'name' => 'Jane Smith',
            'tanggal_lahir' => '1990-03-20',
            'jenis_kelamin' => 'Perempuan',
            'alamat_lengkap' => 'Jl. Organizer Alamat No. 456',
            'kota_kabupaten' => 'Kota Bandung',
            'provinsi' => 'Jawa Barat',
            'kode_pos' => '54321',
            'otp' => '654321',
            'role' => 'event_organizer',
        ]);

        // Admin
        User::create([
            'username' => 'admin123',
            'email' => 'admin@example.com',
            'no_telp' => '081234567892',
            'password' => Hash::make('adminpassword'),
            'name' => 'Admin User',
            'tanggal_lahir' => '1985-08-10',
            'jenis_kelamin' => 'Laki-laki',
            'alamat_lengkap' => 'Jl. Admin Alamat No. 789',
            'kota_kabupaten' => 'Kota Surabaya',
            'provinsi' => 'Jawa Timur',
            'kode_pos' => '67890',
            'otp' => '111222',
            'role' => 'admin',
        ]);
    }
}
