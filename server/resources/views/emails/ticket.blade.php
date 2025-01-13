<h1>Hi, {{ $user->name }}!</h1>

<p>Thank you for purchasing tickets for <strong>{{ $event->name }}</strong>.</p>

<p><strong>Event Details:</strong></p>
<ul>
    <li>Event: {{ $event->name }}</li>
    <li>Date: {{ $event->start_date }}</li>
    <li>Location: {{ $event->location }}</li>
    <li>Ticket Type: {{ $ticket->type }}</li>
    <li>Quantity: {{ $purchase->quantity }}</li>
</ul>

<p>Please keep this email as proof of your purchase.</p>

<p>Thank you,</p>
<p>The Event Team</p>
