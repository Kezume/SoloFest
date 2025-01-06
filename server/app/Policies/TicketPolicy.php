<?php

namespace App\Policies;

use App\Models\Event;
use App\Models\Ticket;
use App\Models\User;

class TicketPolicy
{
    /**
     * Create a new policy instance.
     */

    public function create(User $user, Event $event)
    {
        // Admin boleh menambahkan tiket ke semua event
        // EO hanya boleh menambahkan tiket ke event yang mereka buat
        return $user->role === 'admin' || ($user->role === 'event_organizer' && $event->user_id === $user->id);
    }

    public function update(User $user, Ticket $ticket)
    {
        // Admin boleh mengupdate semua tiket
        // EO hanya boleh mengupdate tiket untuk event yang mereka buat
        return $user->role === 'admin' || ($user->role === 'event_organizer' && $ticket->event->user_id === $user->id);
    }

    public function delete(User $user, Ticket $ticket)
    {
        // Admin boleh menghapus semua tiket
        // EO hanya boleh menghapus tiket untuk event yang mereka buat
        return $user->role === 'admin' || ($user->role === 'event_organizer' && $ticket->event->user_id === $user->id);
    }
    public function __construct()
    {
        //
    }
}
