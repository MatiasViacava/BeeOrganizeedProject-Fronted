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

import {RecursoAcademicoComponent} from "./components/recurso-academico/recurso-academico.component";
import {RecursoAcademicoCreaeditaComponent} from "./components/recurso-academico/recurso-academico-creaedita/recurso-academico-creaedita.component";
import {RecursoAcademicoListarComponent} from "./components/recurso-academico/recurso-academico-listar/recurso-academico-listar.component";

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
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { ConfiguracionCreaeditaComponent } from './components/configuracion/configuracion-creaedita/configuracion-creaedita.component';
import { ConfiguracionListarComponent } from './components/configuracion/configuracion-listar/configuracion-listar.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MenuComponent } from './components/menu/menu.component';
import { RecursoAcademicoBuscarfechaComponent } from './components/recurso-academico/recurso-academico-buscarfecha/recurso-academico-buscarfecha.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
 {
    path: '',
    redirectTo: 'landingpage', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'components',
    loadChildren: () => import('./components/components.module').then((m) => m.ComponentsModule),
  },
  {
    path: 'landingpage', component: LandingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
