<?php

namespace App\Jobs;

use App\Models\Purchase;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CancelPendingPurchases implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $expiredPurchases = Purchase::where('status', 'pending')
            ->where('created_at', '<', Carbon::now()->subDay())
            ->get();

        foreach ($expiredPurchases as $purchase) {
            $purchase->update(['status' => 'expired']);
            $purchase->ticket->increment('quantity', $purchase->quantity);
        }
    }
}
