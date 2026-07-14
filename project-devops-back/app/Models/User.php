<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $blueprint) {
            $blueprint->string('role')->default('User');
            $blueprint->string('status')->default('Activo');
            $blueprint->date('birth_date')->nullable();
            $blueprint->string('contract_type')->nullable();
            $blueprint->json('permissions')->nullable();
            $blueprint->string('password')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $blueprint) {
            $blueprint->dropColumn(['role', 'status', 'birth_date', 'contract_type', 'permissions']);
        });
    }
};