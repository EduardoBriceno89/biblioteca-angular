import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/servicios/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<CrearUsuarioComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  myForm = this.fb.group({
    name: this.fb.control(''),
    password: this.fb.control(''),
    role: this.fb.control(''),
  });

  saveUser() {
    this.api.addUser(this.myForm.value).subscribe(() => {
      this.snackBar.open('Usuario creado correctamente', 'Cerrar', {
        duration: 3000,
      });
      this.dialogRef.close();
    });
  }

  close() {
    this.dialogRef.close();
  }
}
