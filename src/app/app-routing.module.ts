import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuariosCreaeditaComponent } from './components/usuarios/usuarios-creaedita/usuarios-creaedita.component';
import { UsuariosListarComponent } from './components/usuarios/usuarios-listar/usuarios-listar.component';
import { TipoActividadComponent } from './components/tipo-actividad/tipo-actividad.component';
import { TipoActividadCreaeditaComponent } from './components/tipo-actividad/tipo-actividad-creaedita/tipo-actividad-creaedita.component';
import { TipoActividadListarComponent } from './components/tipo-actividad/tipo-actividad-listar/tipo-actividad-listar.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { CursosCreaeditaComponent } from './components/cursos/cursos-creaedita/cursos-creaedita.component';
import { CursosListarComponent } from './components/cursos/cursos-listar/cursos-listar.component';
import { IdiomaComponent } from './components/idioma/idioma.component';
import { CreaeditaIdiomaComponent } from './components/idioma/creaedita-idioma/creaedita-idioma.component';
import { ListarIdiomaComponent } from './components/idioma/listar-idioma/listar-idioma.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';
import { PreguntaCreaeditaComponent } from './components/pregunta/pregunta-creaedita/pregunta-creaedita.component';
import { PreguntaListarComponent } from './components/pregunta/pregunta-listar/pregunta-listar.component';
import { RespuestaComponent } from './components/respuesta/respuesta.component';
import { RespuestaCreaeditaComponent } from './components/respuesta/respuesta-creaedita/respuesta-creaedita.component';
import { RespuestaListarComponent } from './components/respuesta/respuesta-listar/respuesta-listar.component';
import { TipoRecursoComponent } from './components/tipo-recurso/tipo-recurso.component';
import { TipoRecursoCreaeditaComponent } from './components/tipo-recurso/tipo-recurso-creaedita/tipo-recurso-creaedita.component';
import { TipoRecursoListarComponent } from './components/tipo-recurso/tipo-recurso-listar/tipo-recurso-listar.component';
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
import { ActividadCreaeditaComponent } from './components/actividad/actividad-creaedita/actividad-creaedita.component';
import { ActividadListarComponent } from './components/actividad/actividad-listar/actividad-listar.component';

const routes: Routes = [
  {
    path: 'usuarios', component: UsuariosComponent, children: [
      { path: 'nuevo', component: UsuariosCreaeditaComponent },
      { path: 'listar', component: UsuariosListarComponent },
      { path: 'edicion/:id', component: UsuariosCreaeditaComponent}
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
