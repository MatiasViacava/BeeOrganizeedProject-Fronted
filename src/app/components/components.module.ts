import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosCreaeditaComponent } from './usuarios/usuarios-creaedita/usuarios-creaedita.component';
import { UsuariosListarComponent } from './usuarios/usuarios-listar/usuarios-listar.component';
import { TipoActividadComponent } from './tipo-actividad/tipo-actividad.component';
import { TipoActividadListarComponent } from './tipo-actividad/tipo-actividad-listar/tipo-actividad-listar.component';
import { TipoActividadCreaeditaComponent } from './tipo-actividad/tipo-actividad-creaedita/tipo-actividad-creaedita.component';
import { CursosComponent } from './cursos/cursos.component';
import { CursosCreaeditaComponent } from './cursos/cursos-creaedita/cursos-creaedita.component';
import { CursosListarComponent } from './cursos/cursos-listar/cursos-listar.component';
import { IdiomaComponent } from './idioma/idioma.component';
import { ListarIdiomaComponent } from './idioma/listar-idioma/listar-idioma.component';
import { CreaeditaIdiomaComponent } from './idioma/creaedita-idioma/creaedita-idioma.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { PreguntaListarComponent } from './pregunta/pregunta-listar/pregunta-listar.component';
import { PreguntaCreaeditaComponent } from './pregunta/pregunta-creaedita/pregunta-creaedita.component';
import { RespuestaComponent } from './respuesta/respuesta.component';
import { RespuestaCreaeditaComponent } from './respuesta/respuesta-creaedita/respuesta-creaedita.component';
import { RespuestaListarComponent } from './respuesta/respuesta-listar/respuesta-listar.component';
import { TipoRecursoComponent } from './tipo-recurso/tipo-recurso.component';
import { TipoRecursoCreaeditaComponent } from './tipo-recurso/tipo-recurso-creaedita/tipo-recurso-creaedita.component';
import { TipoRecursoListarComponent } from './tipo-recurso/tipo-recurso-listar/tipo-recurso-listar.component';
import { RecursoAcademicoComponent } from './recurso-academico/recurso-academico.component';
import { RecursoAcademicoCreaeditaComponent } from './recurso-academico/recurso-academico-creaedita/recurso-academico-creaedita.component';
import { RecursoAcademicoListarComponent } from './recurso-academico/recurso-academico-listar/recurso-academico-listar.component';
import { TipoUsuarioComponent } from './tipo-usuario/tipo-usuario.component';
import { TipousuarioCreaeditaComponent } from './tipo-usuario/tipousuario-creaedita/tipousuario-creaedita.component';
import { TipousuarioListarComponent } from './tipo-usuario/tipousuario-listar/tipousuario-listar.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { EncuestaCreaeditaComponent } from './encuesta/encuesta-creaedita/encuesta-creaedita.component';
import { EncuestaListarComponent } from './encuesta/encuesta-listar/encuesta-listar.component';
import { HorarioComponent } from './horario/horario.component';
import { HorarioListarComponent } from './horario/horario-listar/horario-listar.component';
import { HorarioCreaeditaComponent } from './horario/horario-creaedita/horario-creaedita.component';
import { ActividadComponent } from './actividad/actividad.component';
import { ActividadListarComponent } from './actividad/actividad-listar/actividad-listar.component';
import { ActividadCreaeditaComponent } from './actividad/actividad-creaedita/actividad-creaedita.component';
import { TipoActividadConfirmarComponent } from './tipo-actividad/tipo-actividad-listar/tipo-actividad-confirmar/tipo-actividad-confirmar.component';
import { CursosConfirmarComponent } from './cursos/cursos-listar/cursos-confirmar/cursos-confirmar.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { ConfiguracionCreaeditaComponent } from './configuracion/configuracion-creaedita/configuracion-creaedita.component';
import { ConfiguracionListarComponent } from './configuracion/configuracion-listar/configuracion-listar.component';
import { MenuComponent } from './menu/menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RecursoAcademicoBuscarfechaComponent } from './recurso-academico/recurso-academico-buscarfecha/recurso-academico-buscarfecha.component';
import { ColorSketchModule } from 'ngx-color/sketch';


import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { ReporteComponent } from './reporte/reporte.component';
import { Reporte01Component } from './reporte/reporte01/reporte01.component';
import { NgChartsModule } from 'ng2-charts';
import { Reporte02Component } from './reporte/reporte02/reporte02.component';
import { Reporte03Component } from './reporte/reporte03/reporte03.component';
import { Reporte04Component } from './reporte/reporte04/reporte04.component';

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
}



@NgModule({
  declarations: [
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
    CursosConfirmarComponent,
    ConfiguracionComponent,
    ConfiguracionCreaeditaComponent,
    ConfiguracionListarComponent,
    MenuComponent,
    RecursoAcademicoBuscarfechaComponent,
    ReporteComponent,
    Reporte01Component,
    Reporte02Component,
    Reporte03Component,
    Reporte04Component
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
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
    MatSidenavModule,
    ColorSketchModule,
    HttpClientModule,

    NgChartsModule,

    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ]
})


export class ComponentsModule { }
