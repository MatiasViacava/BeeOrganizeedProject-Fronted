import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuariosCreaeditaComponent } from './components/usuarios/usuarios-creaedita/usuarios-creaedita.component';
import { UsuariosListarComponent } from './components/usuarios/usuarios-listar/usuarios-listar.component';
import { HttpClientModule } from '@angular/common/http';
import{ MatTableModule} from '@angular/material/table'
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule} from '@angular/material/core'
import { MatPaginatorModule} from '@angular/material/paginator'
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import{ MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TipoActividadComponent } from './components/tipo-actividad/tipo-actividad.component';
import { TipoActividadListarComponent } from './components/tipo-actividad/tipo-actividad-listar/tipo-actividad-listar.component';
import { TipoActividadCreaeditaComponent } from './components/tipo-actividad/tipo-actividad-creaedita/tipo-actividad-creaedita.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    UsuariosCreaeditaComponent,
    UsuariosListarComponent,
    TipoActividadComponent,
    TipoActividadListarComponent,
    TipoActividadCreaeditaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
