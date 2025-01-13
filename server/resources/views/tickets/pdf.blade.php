<!DOCTYPE html>
<html>
<head>
    <title>e-Ticket</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .content {
            border: 1px solid #ddd;
            padding: 15px;
            margin-bottom: 20px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #555;
        }
    </style>
</head>
<body>
    @for ($i = 0; $i < $purchase->quantity; $i++)
        <div class="header">
            <h1>{{ $event->name }}</h1>
            <p><strong>Date:</strong> {{ $event->date }}</p>
            <p><strong>Location:</strong> {{ $event->location }}</p>
        </div>
        <div class="content">
            <p><strong>Order ID:</strong> ORDER-{{ $purchase->id }}</p>
            <p><strong>Ticket Type:</strong> {{ $ticket->type }}</p>
            <p><strong>Ticket Number:</strong> {{ $i + 1 }} of {{ $purchase->quantity }}</p>
            <p><strong>Total Price:</strong> Rp {{ number_format($purchase->total_price, 0, ',', '.') }}</p>
            {{-- <p><strong>Buyer Name:</strong> {{ $purchase->user->name }}</p>
            <p><strong>Email:</strong> {{ $purchase->user->email }}</p> --}}
        </div>
        <div class="footer">
            <p>This e-ticket is valid only for the specified event. Please present this ticket at the event venue as proof of purchase.</p>
        </div>
        @if ($i < $purchase->quantity - 1)
            <div style="page-break-after: always;"></div>
        @endif
    @endfor
</body>
</html>
