import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { PanelComponent } from './componentes/panel/panel.component';
import { AdminDashboardComponent } from './componentes/admin-dashboard/admin-dashboard.component';
import { authGuard } from './guards/auth.guard';
import { UsersComponent } from './componentes/admin-dashboard/users/users.component';
import { FilesComponent } from './componentes/admin-dashboard/files/files.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // <-- Aquí se coloca la ruta por defecto
  { path: 'login', component: LoginComponent }, // <-- Aquí se coloca la ruta login
  { path: 'panel', component: PanelComponent, canActivate: [authGuard] }, // rutas protegidas
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [authGuard], // rutas protegidas
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'files', component: FilesComponent },
    ],
  },
  // route para una ruta 404
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
