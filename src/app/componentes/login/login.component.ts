import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    if (this.apiService.isLoggedIn()) {
      // Si el usuario ya ha iniciado sesión, redirigir a la ruta /panel
      this.router.navigate(['/panel']);
    }
  }

  matricula: string = '';
  password: string = '';

  onSubmit() {
    const { matricula, password } = this;
    this.apiService.login(matricula, password);
  }
}
