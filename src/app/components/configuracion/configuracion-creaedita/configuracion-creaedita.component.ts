import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Configuracion } from 'src/app/models/configuracion';
import { Idioma } from 'src/app/models/idioma';
import { Usuarios } from 'src/app/models/usuarios';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { IdiomaService } from 'src/app/services/idioma.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-configuracion-creaedita',
  templateUrl: './configuracion-creaedita.component.html',
  styleUrls: ['./configuracion-creaedita.component.css']
})
export class ConfiguracionCreaeditaComponent implements OnInit {
  form:FormGroup=new FormGroup({});
  configuracionarc:Configuracion=new Configuracion();
  mensaje:string='';
  titulo:string='Registro de configuración';

  idIDIoma:number=0;
  listaID:Idioma[]=[];

  idUsuario:number=0;
  listaUsuario:Usuarios[]=[];

  edicion:boolean=false;
  idCOnfiguracion:number=0
  colorSeleccionado: any;
  idiomaActivo: any;

  role: string = "";
  username: string = "";
  id: number = 0;
  boton:boolean=false
  
  constructor(
    private loginService: LoginService, 
    private raS:ConfiguracionService,
    private trS:IdiomaService,
    private cS:UsuariosService,
    private router:Router,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute,
    public translate: TranslateService,
    private tuS: ConfiguracionService,
  ) {
  }
  ngOnInit():void {
    this.role=this.loginService.showRole();
    this.username=this.loginService.showUsername();
    if (this.role=='Estudiante'){
        this.boton=true
    }

    this.form=this.formBuilder.group({
      idConfiguracion:[''],
      colorInterfaz:['',Validators.required],
      idioma:['',Validators.required],
      usuario:['',Validators.required]
    });
    this.route.params.subscribe((data:Params)=>{
      this.idCOnfiguracion=data['idConfiguracion'];
      this.edicion=data['idConfiguracion']!=null;

      if (this.edicion) {this.titulo="Editar configuración"}

      this.init();
    })
    
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');


    this.tuS.idiomaSubject.subscribe(idioma => {
      this.idiomaActivo = idioma;
      this.translate.use(this.idiomaActivo);
    });
    this.translate.use(this.idiomaActivo);

    this.cS.list().subscribe(data => { this.listaUsuario = data });
    this.trS.list().subscribe(data => { this.listaID = data });
  }
  aceptar():void{
    if(this.form.valid){
      this.configuracionarc.idConfiguracion=this.form.value.idConfiguracion;
      this.configuracionarc.colorInterfaz=this.form.value.colorInterfaz;

      this.configuracionarc.idioma.idIdioma=this.form.value.idioma;
      this.configuracionarc.usuario.id=this.form.value.usuario;
      if(this.edicion){
        this.raS.modificar(this.configuracionarc).subscribe((data)=>{
          this.raS.list().subscribe((data) => {
            if (this.role=='Administrador') {this.raS.setList(data);}
          })
        })
      }else {
        this.raS.insert(this.configuracionarc).subscribe((data)=>{
          this.raS.list().subscribe((data) => {
            if (this.role=='Administrador') {this.raS.setList(data);}
          })
        })
      }
      this.aplicarcambios();
    }else{
      this.mensaje="Por favor complete todos los campos obligatorios."
    }

  }
  obtenerControlCampo(nombreCampo:string):AbstractControl{
    const control=this.form.get(nombreCampo);
    if(!control){
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
  init(){
    if(this.edicion){
      this.raS.listarId(this.idCOnfiguracion).subscribe((data:Configuracion)=>{
        this.form=this.formBuilder.group({
          idConfiguracion:[data.idConfiguracion],
          colorInterfaz:[data.colorInterfaz],
          idioma:[data.idioma.idIdioma],
          usuario:[data.usuario.id]
        })
      })
    }
  }

  colorF(event: any) {
    this.colorSeleccionado = event.color.hex; // Actualiza el color seleccionado
    this.form.get('colorInterfaz')?.setValue(this.colorSeleccionado); // Actualiza el valor en el formulario
  }

  aplicarcambios() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      this.router.navigate(['/components/configuracion/listar']);
    });
  }


  
}
