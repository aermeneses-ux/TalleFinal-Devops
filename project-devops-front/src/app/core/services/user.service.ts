import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/users'; // 👈 Ajusta según tu backend

  // Estado con Signals
  private usersState = signal<User[]>([]);
  users = computed(() => this.usersState());

  constructor(private http: HttpClient) {}

  // CRUD con llamadas HTTP
  fetchUsers(): void {
    this.http.get<User[]>(this.apiUrl).subscribe(data => {
      this.usersState.set(data);
    });
  }
  
  getUsers() {
    return this.users();
  }


  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): void {
    this.http.post<User>(this.apiUrl, user).subscribe(newUser => {
      this.usersState.update(users => [...users, newUser]);
    });
  }

  updateUser(updatedUser: User): void {
    this.http.put<User>(`${this.apiUrl}/${updatedUser.id}`, updatedUser)
      .subscribe(user => {
        this.usersState.update(users =>
          users.map(u => u.id === user.id ? user : u)
        );
      });
  }

  deleteUser(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.usersState.update(users => users.filter(u => u.id !== id));
    });
  }
}
