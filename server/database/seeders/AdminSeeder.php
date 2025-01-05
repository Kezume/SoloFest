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
        User::create([
            'name' => 'Admin SoloFest',
            'email' => 'admin@solofest.com',
            'email_verified_at' => now(),
            'password' => Hash::make('admin123'),
            'role' => 'admin'
        ]);

        // Tambahan data dummy untuk role lain
        User::create([
            'name' => 'Event Organizer',
            'email' => 'organizer@solofest.com',
            'email_verified_at' => now(),
            'password' => Hash::make('organizer123'),
            'role' => 'event_organizer'
        ]);

        User::create([
            'name' => 'Member User',
            'email' => 'member@solofest.com',
            'email_verified_at' => now(),
            'password' => Hash::make('member123'),
            'role' => 'member'
        ]);
    }
}
