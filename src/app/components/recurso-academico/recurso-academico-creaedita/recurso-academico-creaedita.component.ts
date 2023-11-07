import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecursoAcademico} from "../../../models/recurso-academico";
import {Curso} from "../../../models/curso";
import {RecursoAcademicoService} from "../../../services/recurso-academico.service";
import {CursosService} from "../../../services/cursos.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TipoRecursoService} from "../../../services/tipo-recurso.service";
import * as moment from 'moment'
import {TipoRecurso} from "../../../models/tiporecurso";

@Component({
  selector: 'app-recurso-academico-creaedita',
  templateUrl: './recurso-academico-creaedita.component.html',
  styleUrls: ['./recurso-academico-creaedita.component.css']
})
export class RecursoAcademicoCreaeditaComponent implements OnInit{
  form:FormGroup=new FormGroup({});
  recursoac:RecursoAcademico=new RecursoAcademico();
  mensaje:string='';
  maxFecha:Date= moment().add(-1,"days").toDate();
  fechaPublicacion:FormControl=new FormControl(new Date());

  idTipoRecurso:number=0;
  listaTR:TipoRecurso[]=[];

  idCurso:number=0;
  listaCursos:Curso[]=[];

  edicion:boolean=false;
  idRecurso:number=0
  constructor(
    private raS:RecursoAcademicoService,
    private trS:TipoRecursoService,
    private cS:CursosService,
    private router:Router,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute
  ) {
  }
  ngOnInit():void {
    this.form=this.formBuilder.group({
      iD:[''],
      enlaceRecurso:['',Validators.required],
      nombreRecurso:['',Validators.required],
      autor:['',Validators.required],
      descripcion:['',Validators.required],
      fechaPublicacion:['',Validators.required],
      tipoRecurso_ID:['',Validators.required],
      curso_IdCurso:['',Validators.required]
    });
    this.route.params.subscribe((data:Params)=>{
      this.idRecurso=data['iD'];
      this.edicion=data['iD']!=null;
      this.init();
    })
    this.cS.list().subscribe(data => { this.listaCursos = data });
    this.trS.list().subscribe(data => { this.listaTR = data });
  }
  aceptar():void{
    if(this.form.valid){
      this.recursoac.iD=this.form.value.iD;
      this.recursoac.enlaceRecurso=this.form.value.enlaceRecurso;
      this.recursoac.autor=this.form.value.autor
      this.recursoac.nombreRecurso=this.form.value.nombreRecurso;
      this.recursoac.descripcion=this.form.value.descripcion;
      this.recursoac.fechaPublicacion=this.form.value.fechaPublicacion;
      this.recursoac.tipoRecurso_ID.iD=this.form.value.tipoRecurso_ID;
      this.recursoac.curso_IdCurso.idCurso=this.form.value.curso_IdCurso;
      if(this.edicion){
        this.raS.modificar(this.recursoac).subscribe((data)=>{
          this.raS.list().subscribe(data=>{
            this.raS.setlist(data);
          })
        })
      }else {
        this.raS.insert(this.recursoac).subscribe((data)=>{
          this.raS.list().subscribe(data =>{
            this.raS.setlist(data);
          })
        })
      }
      this.router.navigate(['/recursoacademico/listar']);
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
      this.raS.listarid(this.idRecurso).subscribe((data:RecursoAcademico)=>{
        this.form=this.formBuilder.group({
          iD:[data.iD],
          enlaceRecurso:[data.enlaceRecurso],
          nombreRecurso:[data.nombreRecurso],
          autor:[data.autor],
          descripcion:[data.descripcion],
          fechaPublicacion:[data.fechaPublicacion],
          tipoRecurso_ID:[data.tipoRecurso_ID.iD],
          curso_IdCurso:[data.curso_IdCurso.idCurso]
        })
      })
    }
  }
}
