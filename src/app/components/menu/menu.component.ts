import { AppComponent } from './../../app.component';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(public route: ActivatedRoute, private router: Router, private loginService: LoginService) {}

  //Puse lo mismo que el app.component para que pueda validar los roles en un futuro.
  role:string="";
  username: string="";

  cerrar() {
    sessionStorage.clear();
    this.router.navigate(['landingpage']);
  }

  iralink(comp1:string,comp2:string){
    this.router.navigate(['components/',comp1,comp2]);
  }


  verificar() {
    this.role=this.loginService.showRole();
    return this.loginService.verificar();
  }

  validarRol(){
    if(this.role=='Administrador' || this.role=='Estudiante'){
      return true;
    }else{
      return false;
    }
  }
}
