import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { LoginService } from 'src/app/services/login.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  constructor(
    public route: ActivatedRoute, 
    private router: Router, 
    private loginService: LoginService,
    private uS: UsuariosService,
    private tuS: ConfiguracionService,
    public translate: TranslateService) {}

  //Puse lo mismo que el app.component para que pueda validar los roles en un futuro.
  role:string="";
  username: string="";
  id: number = 0;
  colorActivo: any;
  idiomaActivo: any;


  cerrar() {
    sessionStorage.clear();
    this.router.navigate(['landingpage']);
  }

  iralink(comp1:string,comp2:string){
    this.router.navigate(['components/',comp1,comp2]);
  }

  verificar() {
    return this.loginService.verificar();
  }

  ngOnInit(): void {
    this.role=this.loginService.showRole();
    this.username=this.loginService.showUsername();
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this.uS.list().subscribe(data=>{
      for (let u of data) {if (u.username==this.username) this.id=u.id}
    })
    
    this.tuS.colorSubject.subscribe(color => {
      this.colorActivo = color;
    });

    this.tuS.idiomaSubject.subscribe(idioma => {
      this.idiomaActivo = idioma;
      this.translate.use(this.idiomaActivo);
    });
    this.translate.use(this.idiomaActivo);
  }
 
}
