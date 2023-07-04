import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PanelComponent } from './componentes/panel/panel.component';
import { ConfirmarEliminacionComponent } from './componentes/admin-dashboard/users/dialogs/confirmar-eliminacion.component';

// Angular Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomMatPaginatorIntl } from './paginator-es';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AdminDashboardComponent } from './componentes/admin-dashboard/admin-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { TokenInterceptor } from './servicios/token.interceptor';
import { NavigationComponent } from './componentes/admin-dashboard/navigation/navigation.component';
import { UsersComponent } from './componentes/admin-dashboard/users/users.component';
import { FilesComponent } from './componentes/admin-dashboard/files/files.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { NavigationPanelComponent } from './componentes/panel/navigation-panel/navigation-panel.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CrearUsuarioComponent } from './componentes/admin-dashboard/users/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from '../app/componentes/admin-dashboard/users/editar-usuario/editar-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PanelComponent,
    AdminDashboardComponent,
    NavigationComponent,
    UsersComponent,
    FilesComponent,
    NavigationPanelComponent,
    ConfirmarEliminacionComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
