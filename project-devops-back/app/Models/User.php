<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'status',
        'birth_date',
        'contract_type',
        'permissions',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'birth_date' => 'date:Y-m-d',
            'permissions' => 'array',
        ];
    }

    public function toArray(): array
    {
        $data = parent::toArray();

        if (array_key_exists('birth_date', $data)) {
            $data['birthDate'] = $data['birth_date'];
            unset($data['birth_date']);
        }

        if (array_key_exists('contract_type', $data)) {
            $data['contractType'] = $data['contract_type'];
            unset($data['contract_type']);
        }

        return $data;
    }
}
