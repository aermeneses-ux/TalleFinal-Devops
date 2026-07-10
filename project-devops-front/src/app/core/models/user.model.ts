// src/app/core/models/user.model.ts
export interface User {
  id?: number; // Opcional porque al crear uno nuevo aún no tiene ID
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Guest';
}