// src/app/core/models/user.model.ts
export interface User {
  id?: number;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Guest';
  status: 'Activo' | 'Inactivo';
  birthDate: string;           // <-- Nuevo: Calendario
  contractType: string;        // <-- Nuevo: Radio button
  permissions: string[];       // <-- Nuevo: Array de Checkboxes
}