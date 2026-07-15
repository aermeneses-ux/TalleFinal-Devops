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
    // Si estamos editando, convertimos el string de fecha que viene del backend a un objeto Date para PrimeNG
    let initialBirthDate: Date | string = '';
    if (this.userToEdit?.birthDate) {
      initialBirthDate = new Date(this.userToEdit.birthDate);
    }

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
      status: [this.userToEdit?.status || 'Activo', [Validators.required]],
      birthDate: [initialBirthDate, [Validators.required]],
      contractType: [
        this.userToEdit?.contractType || 'Tiempo Completo',
        [Validators.required],
      ],
      // 🌟 SOLUCIÓN 1: Nos aseguramos de que por defecto siempre sea un array vacío [] y nunca undefined/null
      permissions: [this.userToEdit?.permissions || []], 
    });
  }

  // Ya no necesitas 'onCheckboxChange' ni 'hasPermission' porque p-checkbox de PrimeNG 
  // gestiona automáticamente la inserción/eliminación de elementos en el array 'permissions' 
  // usando [value] y formControlName de manera reactiva.

  saveUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    // Obtenemos los valores actuales del formulario
    const rawValues = this.userForm.value;

    // 🌟 SOLUCIÓN 2: Sanitizar y preparar los datos para el backend
    const userData: User = {
      ...rawValues,
      // Aseguramos que 'permissions' sea un array (por si acaso PrimeNG lo alteró a null)
      permissions: rawValues.permissions || [],
      // Formateamos la fecha a formato ISO (YYYY-MM-DD) para que no rompa el backend
      birthDate: rawValues.birthDate instanceof Date 
        ? rawValues.birthDate.toISOString().split('T')[0] 
        : rawValues.birthDate
    };

    if (userData.id) {
      this.userService.updateUser(userData);
    } else {
      this.userService.createUser(userData);
    }

    this.onClose.emit(); // Cerrar formulario al terminar
  }
}
