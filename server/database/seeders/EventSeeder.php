<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Event::create([
            'name' => 'Solo Music Festival',
            'description' => 'A grand music festival showcasing local and international artists.',
            'location' => 'Solo Grand Park',
            'start_date' => '2025-02-15',
            'end_date' => '2025-02-17',
            'user_id' => 2,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
