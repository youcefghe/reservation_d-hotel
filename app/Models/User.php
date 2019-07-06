<?php

namespace App\Models;
use Spatie\Permission\Models\Role;
use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Support\Collection;

use Illuminate\Database\Eloquent\Builder;
use Spatie\Permission\PermissionRegistrar;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Notifiable;
    use Authenticatable, Authorizable;
    use HasRoles;
    protected $guard_name = 'api';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'UserName', 'Email','Password','api_token','PhoneNumber','Address','banne','role'
    ];

    
    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'Password',
    ];
    public function reservations()
    {
        return $this->hasMany('App\Models\Reservation');
    }
    public function histroriques()
    {
        return $this->hasMany('App\Models\Histrorique');
    }
    public $timestamps = false;
  
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(
            config('role.models.role'),
            config('role.table_names.user_has_roles'),
            'user_id',
            'role_id'
        );
    }
}