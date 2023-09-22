import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/servicios/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirmar-eliminacion',
  template: `
    <form [formGroup]="myForm">
      <h1 mat-dialog-title>Editar usuario</h1>
      <div mat-dialog-content class="mat-dialog-content">
        <mat-form-field class="mat-form-field">
          <mat-label>Nombre</mat-label>
          <input
            type="text"
            minlength="3"
            maxlength="50"
            placeholder="Eduardo Perez"
            formControlName="name"
            matInput
            required
            pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*"
          />
          <mat-error *ngIf="myForm.get('name')?.hasError('required')"
            >El nombre es obligatorio</mat-error
          >
          <mat-error *ngIf="myForm.get('name')?.hasError('minlength')"
            >El nombre debe tener al menos 3 caracteres</mat-error
          >
          <mat-error *ngIf="myForm.get('name')?.hasError('maxlength')"
            >El nombre no puede tener más de 50 caracteres</mat-error
          >
          <mat-error *ngIf="myForm.get('name')?.hasError('pattern')"
            >El nombre solo debe tener caracteres</mat-error
          >
        </mat-form-field>
        <mat-form-field class="mat-form-field">
          <mat-label>Contraseña</mat-label>
          <input
            type="password"
            minlength="8"
            maxlength="20"
            formControlName="password"
            matInput
            required
          />
          <mat-error
            *ngIf="
              myForm.get('password')?.hasError('minlength') ||
              myForm.get('password')?.hasError('maxlength')
            "
            >La contraseña debe ser entre 8 y 20 caracteres</mat-error
          >
          <mat-error *ngIf="myForm.get('password')?.hasError('required')"
            >La contrasena no puede estar vacía</mat-error
          >
        </mat-form-field>
        <mat-form-field class="mat-form-field">
          <mat-label>Role</mat-label>
          <mat-select formControlName="role" required>
            <mat-option value="user">Alumno</mat-option>
            <mat-option value="admin">Admin</mat-option>
          </mat-select>
          <mat-error *ngIf="myForm.get('role')?.hasError('required')"
            >El role no debe estar vacío</mat-error
          >
        </mat-form-field>
      </div>
      <div mat-dialog-actions class="mat-dialog-actions">
        <button mat-raised-button color="warn" (click)="onCancelarClick()">
          Cerrar
        </button>
        <button
          mat-raised-button
          color="primary"
          (click)="guardarCambios()"
          [disabled]="myForm.invalid"
        >
          Actualizar
        </button>
      </div>
    </form>
  `,
  styleUrls: ['../users.component.css'],
})
export class EditarUsuarioComponent {
  myForm: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<EditarUsuarioComponent>,
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public user: any
  ) {
    this.myForm = this.fb.group({
      name: [this.user.name],
      password: [this.user.password],
      role: [this.user.role],
    });
  }

  guardarCambios() {
    const updateUser = { ...this.user, ...this.myForm.value };
    const id = this.user._id;

    this.apiService.updateUser(id, updateUser).subscribe(
      () => {
        this.dialogRef.close('actualizar');
        this.snackBar.open('Usuario actualizado correctamente', 'Cerrar', {
          duration: 3000,
        });
      },
      () => {
        this.snackBar.open('Error al actualizar el usuario', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }

  onCancelarClick(): void {
    this.dialogRef.close();
  }

  onGuardarClick(): void {
    this.dialogRef.close('actualizar');
  }
}
