import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosListarComponent } from './usuarios/usuarios-listar/usuarios-listar.component';
import { UsuariosCreaeditaComponent } from './usuarios/usuarios-creaedita/usuarios-creaedita.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { ConfiguracionCreaeditaComponent } from './configuracion/configuracion-creaedita/configuracion-creaedita.component';
import { ConfiguracionListarComponent } from './configuracion/configuracion-listar/configuracion-listar.component';
import { TipoActividadComponent } from './tipo-actividad/tipo-actividad.component';
import { TipoActividadCreaeditaComponent } from './tipo-actividad/tipo-actividad-creaedita/tipo-actividad-creaedita.component';
import { TipoActividadListarComponent } from './tipo-actividad/tipo-actividad-listar/tipo-actividad-listar.component';
import { CursosComponent } from './cursos/cursos.component';
import { CursosCreaeditaComponent } from './cursos/cursos-creaedita/cursos-creaedita.component';
import { CursosListarComponent } from './cursos/cursos-listar/cursos-listar.component';
import { IdiomaComponent } from './idioma/idioma.component';
import { CreaeditaIdiomaComponent } from './idioma/creaedita-idioma/creaedita-idioma.component';
import { ListarIdiomaComponent } from './idioma/listar-idioma/listar-idioma.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { PreguntaCreaeditaComponent } from './pregunta/pregunta-creaedita/pregunta-creaedita.component';
import { PreguntaListarComponent } from './pregunta/pregunta-listar/pregunta-listar.component';
import { RespuestaComponent } from './respuesta/respuesta.component';
import { RespuestaCreaeditaComponent } from './respuesta/respuesta-creaedita/respuesta-creaedita.component';
import { RespuestaListarComponent } from './respuesta/respuesta-listar/respuesta-listar.component';
import { TipoRecursoComponent } from './tipo-recurso/tipo-recurso.component';
import { TipoRecursoCreaeditaComponent } from './tipo-recurso/tipo-recurso-creaedita/tipo-recurso-creaedita.component';
import { TipoRecursoListarComponent } from './tipo-recurso/tipo-recurso-listar/tipo-recurso-listar.component';
import { RecursoAcademicoComponent } from './recurso-academico/recurso-academico.component';
import { RecursoAcademicoCreaeditaComponent } from './recurso-academico/recurso-academico-creaedita/recurso-academico-creaedita.component';
import { RecursoAcademicoListarComponent } from './recurso-academico/recurso-academico-listar/recurso-academico-listar.component';
import { RecursoAcademicoBuscarfechaComponent } from './recurso-academico/recurso-academico-buscarfecha/recurso-academico-buscarfecha.component';
import { TipoUsuarioComponent } from './tipo-usuario/tipo-usuario.component';
import { TipousuarioCreaeditaComponent } from './tipo-usuario/tipousuario-creaedita/tipousuario-creaedita.component';
import { TipousuarioListarComponent } from './tipo-usuario/tipousuario-listar/tipousuario-listar.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { EncuestaCreaeditaComponent } from './encuesta/encuesta-creaedita/encuesta-creaedita.component';
import { EncuestaListarComponent } from './encuesta/encuesta-listar/encuesta-listar.component';
import { HorarioComponent } from './horario/horario.component';
import { HorarioCreaeditaComponent } from './horario/horario-creaedita/horario-creaedita.component';
import { HorarioListarComponent } from './horario/horario-listar/horario-listar.component';
import { ActividadComponent } from './actividad/actividad.component';
import { ActividadCreaeditaComponent } from './actividad/actividad-creaedita/actividad-creaedita.component';
import { ActividadListarComponent } from './actividad/actividad-listar/actividad-listar.component';
import { MenuComponent } from './menu/menu.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'usuarios', component: UsuariosComponent, children: [
      { path: 'listar', component: UsuariosListarComponent },
      { path: 'nuevo', component: UsuariosCreaeditaComponent },
      { path: 'edicion/:id', component: UsuariosCreaeditaComponent}
    ]
  },
  {
    path: 'configuracion', component: ConfiguracionComponent, children: [
      { path: 'nuevo', component: ConfiguracionCreaeditaComponent },
      { path: 'listar', component: ConfiguracionListarComponent },
      { path: 'edicion/:idConfiguracion', component: ConfiguracionCreaeditaComponent}
    ]
  },

  {
    path: 'tipoactividad', component: TipoActividadComponent, children: [
      { path: 'nuevo', component: TipoActividadCreaeditaComponent },
      { path: 'listar', component: TipoActividadListarComponent },
      { path: 'edicion/:iDTipoActividad', component: TipoActividadCreaeditaComponent}
    ]
  },

  {
    path: 'cursos', component: CursosComponent, children: [
      { path: 'nuevo', component: CursosCreaeditaComponent },
      { path: 'listar', component: CursosListarComponent },
      { path: 'edicion/:idCurso', component: CursosCreaeditaComponent}
    ]
  },

  {
    path: 'idioma', component: IdiomaComponent, children: [
      { path: 'nuevo', component: CreaeditaIdiomaComponent },
      { path: 'listar', component: ListarIdiomaComponent },
      { path: 'edicion/:idIdioma', component: CreaeditaIdiomaComponent}
    ]
  },

  {
    path: 'pregunta', component: PreguntaComponent, children: [
      { path: 'nuevo', component: PreguntaCreaeditaComponent },
      { path: 'listar', component: PreguntaListarComponent },
      { path: 'edicion/:idPregunta', component: PreguntaCreaeditaComponent}
    ]
  },

  {
    path: 'respuesta', component: RespuestaComponent, children: [
      { path: 'nuevo', component: RespuestaCreaeditaComponent },
      { path: 'listar', component: RespuestaListarComponent },
      { path: 'edicion/:idRespuesta', component: RespuestaCreaeditaComponent}
    ]
  },

  {
    path: 'tiporecurso', component: TipoRecursoComponent, children: [
      { path: 'nuevo', component: TipoRecursoCreaeditaComponent },
      { path: 'listar', component: TipoRecursoListarComponent },
      { path: 'edicion/:iD', component: TipoRecursoCreaeditaComponent}
    ]
  },
  {
    path:'recursoacademico',component:RecursoAcademicoComponent,children:[
      {path:'nuevo',component:RecursoAcademicoCreaeditaComponent},
      {path:'listar',component: RecursoAcademicoListarComponent},
      {path: 'edicion/:iD',component: RecursoAcademicoCreaeditaComponent},
      {path: 'buscarfecha',component: RecursoAcademicoBuscarfechaComponent}
    ]
  },
  {
    path: 'tipousuario', component: TipoUsuarioComponent, children: [
      { path: 'nuevo', component: TipousuarioCreaeditaComponent },
      { path: 'listar', component: TipousuarioListarComponent },
      { path: 'edicion/:idTipoUsuario', component: TipousuarioCreaeditaComponent}
    ]
  },
  {
    path: 'encuestas', component: EncuestaComponent, children: [
      { path: 'nuevo', component: EncuestaCreaeditaComponent },
      { path: 'listar', component: EncuestaListarComponent },
      { path: 'edicion/:idEncuesta', component: EncuestaCreaeditaComponent}
    ]
  },
  {
    path: 'horario', component: HorarioComponent, children: [
      { path: 'nuevo', component: HorarioCreaeditaComponent },
      { path: 'listar', component: HorarioListarComponent },
      { path: 'edicion/:idHorario', component: HorarioCreaeditaComponent}
    ]
  },
  {
    path: 'actividad', component: ActividadComponent, children: [
      { path: 'nuevo', component: ActividadCreaeditaComponent },
      { path: 'listar', component: ActividadListarComponent },
      { path: 'edicion/:idActividad', component: ActividadCreaeditaComponent}

    ]
  },
  {
    path: 'menu', component: MenuComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
