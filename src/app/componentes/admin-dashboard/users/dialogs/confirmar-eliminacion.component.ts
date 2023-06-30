import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-eliminacion',
  template: `
    <div class="mat-dialog-container">
      <h1 class="mat-dialog-title">Confirmar Eliminación</h1>
      <p class="mat-dialog-content">
        ¿Estás seguro de que deseas eliminar este usuario?
      </p>

      <div class="mat-dialog-actions">
        <button mat-raised-button color="primary" (click)="onCancelarClick()">
          Cancelar
        </button>
        <button mat-raised-button color="warn" (click)="onConfirmarClick()">
          Confirmar
        </button>
      </div>
    </div>
  `,
  styleUrls: ['../users.component.css'],
})
export class ConfirmarEliminacionComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmarEliminacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancelarClick(): void {
    this.dialogRef.close();
  }

  onConfirmarClick(): void {
    this.dialogRef.close('confirmar');
  }
}
