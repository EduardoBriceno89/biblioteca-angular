import { Component, Inject } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-file',
  templateUrl: './crear-file.component.html',
  styleUrls: ['./crear-file.component.css'],
})
export class CrearFileComponent {
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<CrearFileComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  myForm = this.fb.group({
    tittle: this.fb.control(''),
    filename: this.fb.control(null),
  });

  selectedFile: string | null = null;

  onFileSelected(event: any) {
    const fileInput = event.target;
    this.selectedFile = fileInput.files[0]?.name;
  }

  addFile() {
    const tittle = this.myForm.get('tittle')?.value;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const file = fileInput.files && fileInput.files[0];

    if (tittle && file) {
      const formData = new FormData();
      formData.append('tittle', tittle);
      formData.append('filename', file);

      this.apiService.addFile(formData).subscribe(() => {
        this.snackBar.open('Archivo creado con éxito', 'Cerrar', {
          duration: 3000,
        });
        this.dialogRef.close();
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
