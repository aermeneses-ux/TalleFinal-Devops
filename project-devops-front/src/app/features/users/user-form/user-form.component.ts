import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  @Input() userToEdit: User | null = null;
  @Output() onClose = new EventEmitter<void>();

  userForm!: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.userForm = this.fb.group({
      id: [this.userToEdit?.id || null],
      name: [this.userToEdit?.name || '', [Validators.required, Validators.minLength(3)]],
      email: [this.userToEdit?.email || '', [Validators.required, Validators.email]],
      role: [this.userToEdit?.role || 'User', [Validators.required]]
    });
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