// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. Importamos tu componente de la lista de usuarios
import { UserListComponent } from './features/users/user-list/user-list.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. Lo agregamos al arreglo de imports
  imports: [CommonModule, UserListComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // (o .scss si usas Sass)
})
export class AppComponent {
  title = 'Mi CRUD de Usuarios';
}