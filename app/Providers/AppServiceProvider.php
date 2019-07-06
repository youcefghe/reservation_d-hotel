<?php

namespace App\Providers;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use app\Providers\AppServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('mailer', function ($app) {
            $app->configure('services');
            return $app->loadComponent('mail', 'Illuminate\Mail\MailServiceProvider', 'mailer');
            });
    }
    function boot()
{
    Schema::defaultStringLength(191); //NEW: Increase StringLength
}
}
