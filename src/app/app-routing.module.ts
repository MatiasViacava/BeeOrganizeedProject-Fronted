import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuariosCreaeditaComponent } from './components/usuarios/usuarios-creaedita/usuarios-creaedita.component';
import { UsuariosListarComponent } from './components/usuarios/usuarios-listar/usuarios-listar.component';
import { TipoActividadComponent } from './components/tipo-actividad/tipo-actividad.component';
import { TipoActividadCreaeditaComponent } from './components/tipo-actividad/tipo-actividad-creaedita/tipo-actividad-creaedita.component';
import { TipoActividadListarComponent } from './components/tipo-actividad/tipo-actividad-listar/tipo-actividad-listar.component';

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

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
