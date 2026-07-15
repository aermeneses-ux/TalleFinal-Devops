import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // 🚀 Apuntamos al subdominio gestionado por tu Traefik
  private apiUrl = 'https://backyumbo.byronrm.com/api/users'; 

  // Estado reactivo con Signals
  private usersState = signal<User[]>([]);
  
  // Esta es la señal pública que leerán tus componentes de PrimeNG
  users = computed(() => this.usersState());

  constructor(private http: HttpClient) {}

  // Carga inicial de usuarios
  fetchUsers(): void {
    this.http.get<User[]>(this.apiUrl).subscribe({
      next: (data) => this.usersState.set(data),
      error: (err) => console.error('Error cargando usuarios:', err)
    });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): void {
    this.http.post<User>(this.apiUrl, user).subscribe({
      next: (newUser) => this.usersState.update(users => [...users, newUser]),
      error: (err) => console.error('Error creando usuario:', err)
    });
  }

  updateUser(updatedUser: User): void {
    this.http.put<User>(`${this.apiUrl}/${updatedUser.id}`, updatedUser).subscribe({
      next: (user) => this.usersState.update(users =>
        users.map(u => u.id === user.id ? user : u)
      ),
      error: (err) => console.error('Error actualizando usuario:', err)
    });
  }

  deleteUser(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => this.usersState.update(users => users.filter(u => u.id !== id)),
      error: (err) => console.error('Error eliminando usuario:', err)
    });
  }
}
