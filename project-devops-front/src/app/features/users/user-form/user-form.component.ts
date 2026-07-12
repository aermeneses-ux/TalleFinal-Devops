import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    SelectModule,
    DatePickerModule,
    RadioButtonModule,
    CheckboxModule,
    ButtonModule,
    FluidModule,
    FormsModule,
  ],
  styleUrl: './user-form.component.css',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  @Input() userToEdit: User | null = null;
  @Output() onClose = new EventEmitter<void>();

  userForm!: FormGroup;

  roles = [
    { label: 'Administrador', value: 'Admin' },
    { label: 'Usuario', value: 'User' },
    { label: 'Invitado', value: 'Guest' }
  ];

  estados = [
    { label: 'Activo', value: 'Activo' },
    { label: 'Inactivo', value: 'Inactivo' }
  ];

  contratos = [
    { label: 'Tiempo Completo', value: 'Tiempo Completo' },
    { label: 'Medio Tiempo', value: 'Medio Tiempo' },
    { label: 'Remoto', value: 'Remoto' }
  ];

  modulos = [
    'Soporte',
    'Reportes',
    'Finanzas'
  ];


  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.userForm = this.fb.group({
      id: [this.userToEdit?.id || null],
      name: [
        this.userToEdit?.name || '',
        [Validators.required, Validators.minLength(3)],
      ],
      email: [
        this.userToEdit?.email || '',
        [Validators.required, Validators.email],
      ],
      role: [this.userToEdit?.role || 'User', [Validators.required]],
      status: [this.userToEdit?.status || 'Activo', [Validators.required]], // Por defecto 'Activo' para que no quede vacío
      birthDate: [this.userToEdit?.birthDate || '', [Validators.required]],
      contractType: [
        this.userToEdit?.contractType || 'Tiempo Completo',
        [Validators.required],
      ],
      permissions: [this.userToEdit?.permissions || []], // Array de strings
    });
  }

  // Helper para manejar la lógica de los Checkboxes
  onCheckboxChange(event: any, permission: string) {
    const currentPermissions: string[] =
      this.userForm.get('permissions')?.value || [];
    if (event.target.checked) {
      this.userForm
        .get('permissions')
        ?.setValue([...currentPermissions, permission]);
    } else {
      this.userForm
        .get('permissions')
        ?.setValue(currentPermissions.filter((p) => p !== permission));
    }
  }

  // Método auxiliar para saber si un checkbox debe aparecer marcado al editar
  hasPermission(permission: string): boolean {
    if (!this.userToEdit || !this.userToEdit.permissions) return false;
    return this.userToEdit.permissions.includes(permission);
  }

  saveUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const userData: User = this.userForm.value;

    if (userData.id) {
      this.userService.updateUser(userData);
    } else {
      this.userService.createUser(userData);
    }

    this.onClose.emit(); // Cerrar formulario al terminar
  }
}
