import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/servicios/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirmar-eliminacion',
  template: `
    <form [formGroup]="myForm">
      <h1 mat-dialog-title>Editar archivo</h1>
      <div mat-dialog-content class="mat-dialog-content">
        <mat-form-field class="mat-form-field">
          <mat-label>Título</mat-label>
          <input
            type="text"
            minlength="3"
            maxlength="50"
            placeholder="Informática II"
            formControlName="tittle"
            matInput
            required
          />
          <mat-error *ngIf="myForm.get('tittle')?.hasError('required')"
            >El título es obligatorio</mat-error
          >
          <mat-error *ngIf="myForm.get('tittle')?.hasError('minlength')"
            >El título debe tener al menos 3 caracteres</mat-error
          >
          <mat-error *ngIf="myForm.get('tittle')?.hasError('maxlength')"
            >El título no puede tener más de 50 caracteres</mat-error
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
  styleUrls: ['../files.component.css'],
})
export class EditarFileComponent {
  myForm: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<EditarFileComponent>,
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public file: any
  ) {
    this.myForm = this.fb.group({
      tittle: [this.file.tittle],
    });
  }

  guardarCambios() {
    const updateFile = { ...this.file, ...this.myForm.value };
    const id = this.file._id;

    this.apiService.updateFile(id, updateFile).subscribe(
      () => {
        this.dialogRef.close('actualizar');
        this.snackBar.open('Archivo actualizado correctamente', 'Cerrar', {
          duration: 3000,
        });
      },
      () => {
        this.snackBar.open('Error al actualizar el archivo', 'Cerrar', {
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
