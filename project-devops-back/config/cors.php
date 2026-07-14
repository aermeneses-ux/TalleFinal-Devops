<?php

// config/cors.php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    
    // Aquí agregamos tu subdominio de frontend específico
    'allowed_origins' => [
        'https://yumbo.byronrm.com',
    ],
    
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // Cambia a true si usas cookies o autenticación Sanctum/Sessions
];
