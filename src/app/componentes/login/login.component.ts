import { Component } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private apiService: ApiService) {}
  matricula: string = '';
  password: string = '';

  onSubmit() {
    const { matricula, password } = this;
    this.apiService.login(matricula, password);
  }
}
