import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  templateUrl: './user-list.component.html'
})
export class UserListComponent {
  private userService = inject(UserService);
  
  // Obtenemos el Signal directamente del servicio
  users = this.userService.users;
  selectedUser: User | null = null;
  isFormOpen = false;

  openCreateForm() {
    this.selectedUser = null;
    this.isFormOpen = true;
  }

  openEditForm(user: User) {
    this.selectedUser = { ...user };
    this.isFormOpen = true;
  }

  deleteUser(id: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUser(id);
    }
  }

  closeForm() {
    this.isFormOpen = false;
    this.selectedUser = null;
  }
}