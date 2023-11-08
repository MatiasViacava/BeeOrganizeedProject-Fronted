import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Configuracion } from 'src/app/models/configuracion';
import { Idioma } from 'src/app/models/idioma';
import { Usuarios } from 'src/app/models/usuarios';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { IdiomaService } from 'src/app/services/idioma.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-configuracion-creaedita',
  templateUrl: './configuracion-creaedita.component.html',
  styleUrls: ['./configuracion-creaedita.component.css']
})
export class ConfiguracionCreaeditaComponent implements OnInit {
  form:FormGroup=new FormGroup({});
  configuracionarc:Configuracion=new Configuracion();
  mensaje:string='';

  idIDIoma:number=0;
  listaID:Idioma[]=[];

  idUsuario:number=0;
  listaUsuario:Usuarios[]=[];

  edicion:boolean=false;
  idCOnfiguracion:number=0
  constructor(
    private raS:ConfiguracionService,
    private trS:IdiomaService,
    private cS:UsuariosService,
    private router:Router,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute
  ) {
  }
  ngOnInit():void {
    this.form=this.formBuilder.group({
      idConfiguracion:[''],
      colorInterfaz:['',Validators.required],
      idioma:['',Validators.required],
      usuario:['',Validators.required]
    });
    this.route.params.subscribe((data:Params)=>{
      this.idCOnfiguracion=data['idConfiguracion'];
      this.edicion=data['idConfiguracion']!=null;
      this.init();
    })
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
          this.raS.list().subscribe(data=>{
            this.raS.setList(data);
          })
        })
      }else {
        this.raS.insert(this.configuracionarc).subscribe((data)=>{
          this.raS.list().subscribe(data =>{
            this.raS.setList(data);
          })
        })
      }
      this.router.navigate(['/components/configuracion/listar']);
    }else{
      this.mensaje="Falta completar campos"
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
}
