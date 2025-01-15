<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Ticket Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            background-color: #800080;
            color: #fff;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .content p {
            margin: 10px 0;
        }
        .content ul {
            list-style-type: none;
            padding: 0;
            margin: 10px 0;
        }
        .content ul li {
            margin: 5px 0;
            padding: 5px 10px;
            background-color: #f1f1f1;
            border-radius: 4px;
        }
        .footer {
            text-align: center;
            padding: 10px;
            background-color: #f1f1f1;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Hi, {{ $user->name }}!</h1>
        </div>
        <div class="content">
            <p>Thank you for purchasing tickets for <strong>{{ $event->name }}</strong>.</p>
            <p><strong>Event Details:</strong></p>
            <ul>
                <li><strong>Event:</strong> {{ $event->name }}</li>
                <li><strong>Date:</strong> {{ $event->start_date }}</li>
                <li><strong>Location:</strong> {{ $event->location }}</li>
                <li><strong>Ticket Type:</strong> {{ $ticket->type }}</li>
                <li><strong>Quantity:</strong> {{ $purchase->quantity }}</li>
            </ul>
            <p>Please keep this email as proof of your purchase.</p>
        </div>
        <div class="footer">
            <p>Thank you,</p>
            <p><strong>The Event Team</strong></p>
        </div>
    </div>
</body>
</html>
