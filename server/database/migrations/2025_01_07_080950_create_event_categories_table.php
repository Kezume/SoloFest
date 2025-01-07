<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_categories', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->string('name')->unique(); // Nama kategori (unik)
            $table->text('description')->nullable(); // Deskripsi kategori (opsional)
            $table->timestamps(); // Timestamps (created_at, updated_at)
        });

        Schema::table('events', function (Blueprint $table) {
            $table->foreignId('category_id')
                ->nullable()
                ->constrained('event_categories')
                ->onDelete('set null'); // Jika kategori dihapus, category_id menjadi NULL
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropColumn('category_id');
        });
        
        Schema::dropIfExists('event_categories');
    }
};
