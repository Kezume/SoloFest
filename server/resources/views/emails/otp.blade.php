<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Verifikasi Email Anda</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="text-align: center; color: #007BFF;">Kode Verifikasi OTP</h2>
        <p>Halo,</p>
        <p>Terima kasih telah mendaftar di aplikasi kami. Silakan gunakan kode OTP berikut untuk memverifikasi email Anda:</p>
        <h1 style="text-align: center; color: #007BFF; font-size: 32px; letter-spacing: 4px;">{{ $otp }}</h1>
        <p>Atau klik tautan di bawah ini untuk memverifikasi email Anda secara otomatis:</p>
        <div style="text-align: center; margin: 20px 0;">
            <a href="{{ url('/api/verify-otp?user_id=' . $user_id . '&otp=' . $otp) }}" 
                style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;">
                Verifikasi Email
            </a>
        </div>
        <p><strong>Catatan:</strong> Kode OTP ini hanya berlaku selama 15 menit.</p>
        <p>Jika Anda tidak merasa mendaftar di aplikasi kami, harap abaikan email ini.</p>
        <p>Salam,<br>Tim Support</p>
    </div>
</body>
</html>
