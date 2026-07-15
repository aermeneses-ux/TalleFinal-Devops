// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  title = 'Usuarios';
  isDarkTheme = false;

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');

    // Usamos claro por defecto a menos que el usuario ya haya elegido oscuro.
    this.isDarkTheme = savedTheme === 'dark';
    this.updateTheme();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    this.updateTheme();
  }

  private updateTheme() {
    document.body.classList.toggle('dark-theme', this.isDarkTheme);
  }
}