<?php

namespace App\Http\Middleware;

use Closure;

class ExampleMiddleware
{
    public function test()
    {
        echo "this function is tested by user";
    }
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        return $next($request);
    }
}
