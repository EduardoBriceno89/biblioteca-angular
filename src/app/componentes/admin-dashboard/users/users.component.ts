import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarEliminacionComponent } from './dialogs/confirmar-eliminacion.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  users: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data: any) => {
      this.users = data.users;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  openFormCrear() {
    const dialogRef = this.dialog.open(CrearUsuarioComponent, {
      width: '400px',
      height: '550px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.apiService.getUsers().subscribe((data: any) => {
        this.users = data.users;
        this.dataSource.data = this.users;
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  openFormEditar(user: any) {
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      width: '400px',
      height: '550px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'actualizar') {
        this.apiService.getUsers().subscribe((data: any) => {
          this.users = data.users;
          this.dataSource.data = this.users;
          this.dataSource.paginator = this.paginator;
        });
      }
    });
  }

  eliminarUsuario(user: any) {
    const id = user._id; // Obtenemos el id del usuario a eliminar

    this.apiService.deleteUser(id).subscribe(
      () => {
        this.snackBar.open('Usuario eliminado correctamente', 'Cerrar', {
          duration: 3000,
        });
        // Vuelve a cargar los usuarios después de eliminar
        this.apiService.getUsers().subscribe((data: any) => {
          this.users = data.users;
          this.dataSource.data = this.users;
          this.dataSource.paginator = this.paginator;
        });
      },
      () => {
        this.snackBar.open('Error al eliminar el usuario', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }

  //dialogo de confirmación de eliminación
  confirmarEliminacion(user: any) {
    const dialogRef = this.dialog.open(ConfirmarEliminacionComponent, {
      width: '400px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirmar') {
        this.eliminarUsuario(user);
      }
    });
  }
}
