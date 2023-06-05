import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { PanelComponent } from './componentes/panel/panel.component';
import { AdminDashboardComponent } from './componentes/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // <-- Aquí se coloca la ruta por defecto
  { path: 'login', component: LoginComponent }, // <-- Aquí se coloca la ruta login
  { path: 'panel', component: PanelComponent },
  { path: 'admin', component: AdminDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
