import { Component, inject, OnInit } from '@angular/core';
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

import { ConfirmationService, MessageService } from 'primeng/api';
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
    SelectModule
  ],
  // 🌟 Agregamos los proveedores locales de PrimeNG para evitar errores de inyección
  providers: [ConfirmationService, MessageService],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
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

  ngOnInit() {
    // Cargamos los usuarios al iniciar el componente
    this.userService.fetchUsers();
  }

  openCreateForm() {
    this.selectedUser = null;
    this.isFormOpen = true;
  }

  openEditForm(user: User) {
    this.selectedUser = { ...user };
    this.isFormOpen = true;
  }

  // 🌟 Captura cuando el Formulario hijo guarda correctamente
  handleSaveSuccess(action: 'create' | 'update') {
    this.isFormOpen = false;
    this.selectedUser = null;

    // Alerta de éxito
    this.messageService.add({
      severity: 'success',
      summary: action === 'create' ? 'Usuario Creado' : 'Usuario Actualizado',
      detail: action === 'create' 
        ? 'El usuario se registró correctamente' 
        : 'Los cambios fueron guardados con éxito',
      life: 3000
    });
  }

  deleteUser(id: number) {
    this.confirmationService.confirm({
      header: 'Eliminar Usuario',
      message: '¿Está seguro de que desea eliminar este usuario?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.userService.deleteUser(id);

        // Alerta de éxito al eliminar
        this.messageService.add({
          severity: 'success',
          summary: 'Usuario eliminado',
          detail: 'El registro fue eliminado correctamente',
          life: 3000
        });
      },
    });
  }

  closeForm() {
    this.isFormOpen = false;
    this.selectedUser = null;
  }

  toggleStatus(user: User) {
    // Cambiamos el estado reactivamente
    const nuevoEstado: 'Activo' | 'Inactivo' = user.status === 'Activo' ? 'Inactivo' : 'Activo';
    const updatedUser = { ...user, status: nuevoEstado };

    this.userService.updateUser(updatedUser);

    // Alerta de cambio de estado rápido
    this.messageService.add({
      severity: 'info',
      summary: 'Estado Actualizado',
      detail: `Usuario ahora está ${nuevoEstado}`,
      life: 2000
    });
  }

  getRoleSeverity(role: string) {
    switch (role) {
      case 'Admin': return 'danger';
      case 'User': return 'info';
      case 'Guest': return 'secondary';
      default: return 'contrast';
    }
  }

  // Getters para las estadísticas de la cabecera
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