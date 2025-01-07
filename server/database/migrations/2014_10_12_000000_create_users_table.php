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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique(); // Username pengguna
            $table->string('email')->unique(); // Email pengguna
            $table->string('no_telp')->unique(); // Nomor telepon
            $table->string('password'); // Password pengguna
            $table->string('name'); // Nama lengkap pengguna
            $table->date('tanggal_lahir')->nullable(); // Tanggal lahir pengguna
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan'])->nullable(); // Jenis kelamin
            $table->text('alamat_lengkap')->nullable(); // Alamat lengkap pengguna
            $table->string('kota_kabupaten')->nullable(); // Kota atau Kabupaten pengguna
            $table->string('provinsi')->nullable(); // Provinsi pengguna
            $table->string('kode_pos')->nullable(); // Kode pos pengguna
            $table->string('otp', 6)->nullable(); // OTP untuk verifikasi email
            $table->timestamp('otp_created_at')->nullable();
            $table->enum('role', ['member', 'event_organizer', 'admin'])->default('member'); // Role pengguna
            $table->timestamp('email_verified_at')->nullable(); // Waktu verifikasi email
            $table->rememberToken(); // Token untuk "Remember Me"
            $table->timestamps(); // Timestamps created_at dan updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
