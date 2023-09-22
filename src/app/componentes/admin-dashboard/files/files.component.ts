import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CrearFileComponent } from './crear-file/crear-file.component';
import { EditarFileComponent } from './editar-file/editar-file.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarEliminacionFileComponent } from './dialogs/confirmar-eliminacion-file.component';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
})
export class FilesComponent implements OnInit, AfterViewInit {
  files: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  searchText = '';

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.apiService.getFiles().subscribe((data: any) => {
      this.files = data.files;
      this.dataSource = new MatTableDataSource(this.files);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter() {
    const filterValue = this.searchText.toLowerCase();

    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  openFormCrear() {
    const dialogRef = this.dialog.open(CrearFileComponent, {
      width: '400px',
      height: '350px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.apiService.getFiles().subscribe((data: any) => {
        this.files = data.files;
        this.dataSource.data = this.files;
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  openFormEditar(file: any) {
    const dialogRef = this.dialog.open(EditarFileComponent, {
      width: '400px',
      height: '350px',
      data: file,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'actualizar') {
        this.apiService.getFiles().subscribe((data: any) => {
          this.files = data.files;
          this.dataSource.data = this.files;
          this.dataSource.paginator = this.paginator;
        });
      }
    });
  }

  eliminarArchivo(file: any) {
    const id = file._id; // Obtenemos el id del usuario a eliminar

    this.apiService.deleteFile(id).subscribe(
      () => {
        this.snackBar.open('Archivo eliminado correctamente', 'Cerrar', {
          duration: 3000,
        });
        // Vuelve a cargar los usuarios después de eliminar
        this.apiService.getFiles().subscribe((data: any) => {
          this.files = data.files;
          this.dataSource.data = this.files;
          this.dataSource.paginator = this.paginator;
        });
      },
      () => {
        this.snackBar.open('Error al eliminar el archivo', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }

  //dialogo de confirmación de eliminación
  confirmarEliminacion(file: any) {
    const dialogRef = this.dialog.open(ConfirmarEliminacionFileComponent, {
      width: '400px',
      data: file,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirmar') {
        this.eliminarArchivo(file);
      }
    });
  }
}
