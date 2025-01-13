<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>e-Ticket</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f3f4f6;
        }
        .ticket-container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
        .header {
            position: relative;
            text-align: center;
            color: #fff;
        }
        .header img {
            width: 100%;
            height: 150px;
            object-fit: cover;
        }
        .header .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
        }
        .header .text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }
        .header p {
            margin: 5px 0;
            font-size: 16px;
        }
        .content {
            padding: 20px;
        }
        .content p {
            margin: 10px 0;
            font-size: 16px;
            color: #333;
        }
        .content p strong {
            color: #111;
        }
        .footer {
            background-color: #f1f5f9;
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #555;
            border-top: 1px solid #e2e8f0;
        }
        .ticket-number {
            text-align: center;
            font-size: 14px;
            margin-top: 10px;
            color: #555;
        }
        @media print {
            .ticket-container {
                page-break-after: always;
            }
        }
    </style>
</head>
<body>
    @for ($i = 0; $i < $purchase->quantity; $i++)
        <div class="ticket-container">
            <!-- Header Section with Event Image -->
            <div class="header">
                <img src="{{ $event->image_url }}" alt="Event Image">
                <div class="overlay"></div>
                <div class="text">
                    <h1>{{ $event->name }}</h1>
                    <p><strong>Date:</strong> {{ $event->date }}</p>
                    <p><strong>Location:</strong> {{ $event->location }}</p>
                </div>
            </div>

            <!-- Content Section -->
            <div class="content">
                <p><strong>Order ID:</strong> ORDER-{{ $purchase->id }}</p>
                <p><strong>Ticket Type:</strong> {{ $ticket->type }}</p>
                <p><strong>Ticket Number:</strong> {{ $i + 1 }} of {{ $purchase->quantity }}</p>
                <p><strong>Total Price:</strong> Rp {{ number_format($purchase->total_price, 0, ',', '.') }}</p>
            </div>

            <!-- Footer Section -->
            <div class="footer">
                <p>This e-ticket is valid only for the specified event. Please present this ticket at the event venue as proof of purchase.</p>
            </div>
        </div>
        @if ($i < $purchase->quantity - 1)
            <div style="page-break-after: always;"></div>
        @endif
    @endfor
</body>
</html>
