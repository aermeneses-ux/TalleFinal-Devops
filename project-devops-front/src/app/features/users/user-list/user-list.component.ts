import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { UserFormComponent } from '../user-form/user-form.component';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    UserFormComponent,
    FormsModule,
    ButtonModule,
    ToolbarModule,
    CardModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    TableModule,
    TagModule,
    ToggleSwitchModule,
    ConfirmDialogModule,
    ToastModule,
    SelectModule,
    ConfirmDialog,
  ],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  private userService = inject(UserService);
  private confirmationService = inject(ConfirmationService);

  private messageService = inject(MessageService);

  // Obtenemos el Signal directamente del servicio
  users = this.userService.users;
  selectedUser: User | null = null;
  isFormOpen = false;
  search = '';

  roles = [
    { label: 'Todos', value: null },
    { label: 'Admin', value: 'Admin' },
    { label: 'User', value: 'User' },
    { label: 'Guest', value: 'Guest' },
  ];

  openCreateForm() {
    this.selectedUser = null;
    this.isFormOpen = true;
  }

  openEditForm(user: User) {
    this.selectedUser = { ...user };
    this.isFormOpen = true;
  }

  deleteUser(id: number) {
    this.confirmationService.confirm({
      header: 'Eliminar Usuario',

      message: '¿Desea eliminar este usuario?',

      icon: 'pi pi-exclamation-triangle',

      acceptButtonStyleClass: 'p-button-danger',

      accept: () => {
        this.userService.deleteUser(id);

        this.messageService.add({
          severity: 'success',

          summary: 'Usuario eliminado',

          detail: 'El registro fue eliminado correctamente',
        });
      },
    });
  }

  closeForm() {
    this.isFormOpen = false;
    this.selectedUser = null;
  }

  toggleStatus(user: User) {
    user.status = user.status === 'Activo' ? 'Inactivo' : 'Activo';

    this.userService.updateUser(user);
  }

  getRoleSeverity(role: string) {
    switch (role) {
      case 'Admin':
        return 'danger';

      case 'User':
        return 'info';

      case 'Guest':
        return 'secondary';

      default:
        return 'contrast';
    }
  }

  saveUser() {
    this.messageService.add({
      severity: 'success',
      summary: 'Usuario creado',
      detail: 'El usuario se guardó correctamente',
    });

    this.messageService.add({
      severity: 'info',

      summary: 'Usuario actualizado',

      detail: 'Cambios guardados',
    });
  }


  get activeUsers(): number {
  return this.users().filter(user => user.status === 'Activo').length;
}

get inactiveUsers(): number {
  return this.users().filter(user => user.status === 'Inactivo').length;
}

get adminUsers(): number {
  return this.users().filter(user => user.role === 'Admin').length;
}
}
