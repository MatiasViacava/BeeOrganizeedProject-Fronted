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
import { CursosComponent } from './components/cursos/cursos.component';
import { CursosCreaeditaComponent } from './components/cursos/cursos-creaedita/cursos-creaedita.component';
import { CursosListarComponent } from './components/cursos/cursos-listar/cursos-listar.component';
import { IdiomaComponent } from './components/idioma/idioma.component';
import { ListarIdiomaComponent } from './components/idioma/listar-idioma/listar-idioma.component';
import { CreaeditaIdiomaComponent } from './components/idioma/creaedita-idioma/creaedita-idioma.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';
import { PreguntaListarComponent } from './components/pregunta/pregunta-listar/pregunta-listar.component';
import { PreguntaCreaeditaComponent } from './components/pregunta/pregunta-creaedita/pregunta-creaedita.component';
import { RespuestaComponent } from './components/respuesta/respuesta.component';
import { RespuestaCreaeditaComponent } from './components/respuesta/respuesta-creaedita/respuesta-creaedita.component';
import { RespuestaListarComponent } from './components/respuesta/respuesta-listar/respuesta-listar.component';
import { TipoRecursoComponent } from './components/tipo-recurso/tipo-recurso.component';
import { TipoRecursoCreaeditaComponent } from './components/tipo-recurso/tipo-recurso-creaedita/tipo-recurso-creaedita.component';
import { TipoRecursoListarComponent } from './components/tipo-recurso/tipo-recurso-listar/tipo-recurso-listar.component';

import { RecursoAcademicoComponent } from './components/recurso-academico/recurso-academico.component';
import { RecursoAcademicoCreaeditaComponent } from './components/recurso-academico/recurso-academico-creaedita/recurso-academico-creaedita.component';
import { RecursoAcademicoListarComponent } from './components/recurso-academico/recurso-academico-listar/recurso-academico-listar.component';

import { TipoUsuarioComponent } from './components/tipo-usuario/tipo-usuario.component';
import { TipousuarioCreaeditaComponent } from './components/tipo-usuario/tipousuario-creaedita/tipousuario-creaedita.component';
import { TipousuarioListarComponent } from './components/tipo-usuario/tipousuario-listar/tipousuario-listar.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { EncuestaCreaeditaComponent } from './components/encuesta/encuesta-creaedita/encuesta-creaedita.component';
import { EncuestaListarComponent } from './components/encuesta/encuesta-listar/encuesta-listar.component';
import { HorarioComponent } from './components/horario/horario.component';
import { HorarioListarComponent } from './components/horario/horario-listar/horario-listar.component';
import { HorarioCreaeditaComponent } from './components/horario/horario-creaedita/horario-creaedita.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import { ActividadListarComponent } from './components/actividad/actividad-listar/actividad-listar.component';
import { ActividadCreaeditaComponent } from './components/actividad/actividad-creaedita/actividad-creaedita.component';


//NUEVO
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { TipoActividadConfirmarComponent } from './components/tipo-actividad/tipo-actividad-listar/tipo-actividad-confirmar/tipo-actividad-confirmar.component';
import { CursosConfirmarComponent } from './components/cursos/cursos-listar/cursos-confirmar/cursos-confirmar.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    UsuariosCreaeditaComponent,
    UsuariosListarComponent,
    TipoActividadComponent,
    TipoActividadListarComponent,
    TipoActividadCreaeditaComponent,
    CursosComponent,
    CursosCreaeditaComponent,
    CursosListarComponent,
    IdiomaComponent,
    ListarIdiomaComponent,
    CreaeditaIdiomaComponent,
    PreguntaComponent,
    PreguntaListarComponent,
    PreguntaCreaeditaComponent,
    RespuestaComponent,
    RespuestaCreaeditaComponent,
    RespuestaListarComponent,
    TipoRecursoComponent,
    TipoRecursoCreaeditaComponent,
    TipoRecursoListarComponent,
    RecursoAcademicoComponent,
    RecursoAcademicoCreaeditaComponent,
    RecursoAcademicoListarComponent,
    TipoUsuarioComponent,
    TipousuarioCreaeditaComponent,
    TipousuarioListarComponent,
    EncuestaComponent,
    EncuestaCreaeditaComponent,
    EncuestaListarComponent,
    HorarioComponent,
    HorarioListarComponent,
    HorarioCreaeditaComponent,
    ActividadComponent,
    ActividadListarComponent,
    ActividadCreaeditaComponent,
    TipoActividadConfirmarComponent,
    CursosConfirmarComponent
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

    MatCardModule,
    MatDialogModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
