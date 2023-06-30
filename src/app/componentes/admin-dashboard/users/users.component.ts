import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarEliminacionComponent } from './dialogs/confirmar-eliminacion.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.apiService.getUsers().subscribe((data: any) => {
      this.users = data.users;
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
        });
      },
      error => {
        this.snackBar.open('Error al eliminar el usuario', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }

  //dialogo de confirmación de eliminación
  confirmarEliminacion(user: any){
    const dialogRef = this.dialog.open(ConfirmarEliminacionComponent, {
      width: '400px',
      data: user
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirmar') {
        this.eliminarUsuario(user);
      }
    })
  }
}