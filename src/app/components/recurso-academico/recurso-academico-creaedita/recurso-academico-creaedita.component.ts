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
  listaTR:RecursoAcademico[]=[];
  idCurso:number=0;
  listaCursos:Curso[]=[];
  edicion:boolean=false;
  constructor(
    private raS:RecursoAcademicoService,
    private trS:TipoRecursoService,
    private cS:CursosService,
    private router:Router,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute
  ) {
  }
  ngOnInit() {
    this.form=this.formBuilder.group({
      idRecursoAcademico:[''],
      enlace:['',Validators.required],
      nombre:['',Validators.required],
      autor:['',Validators.required],
      descripcion:['',Validators.required],
      fechaPublicacion:['',Validators.required],
      TipoRecursoDTO:['',Validators.required],
      CursoDTO:['',Validators.required]
    });
    this.route.params.subscribe((data:Params)=>{
      this.idTipoRecurso=data['iD'];
      this.edicion=data['iD']!=null;
      this.init();
    })
  }
  aceptar(){
    if(this.form.valid){
      this.recursoac.iD=this.form.value.idRecursoAcademico;
      this.recursoac.enlaceRecurso=this.form.value.enlace;
      this.recursoac.nombreRecurso=this.form.value.nombre;
      this.recursoac.descripcion=this.form.value.descripcion;
      this.recursoac.fechaPublicacion=this.form.value.fechaPublicacion;
      this.recursoac.TipoRecursoDTO=this.form.value.TipoRecursoDTO;
      this.recursoac.CursoDTO=this.form.value.CursoDTO;
      if(this.edicion){
        let tr:TipoRecurso=new TipoRecurso();
        tr.iD=this.idTipoRecurso;
        let c:Curso=new Curso();
        c.idCurso=this.idCurso;
        this.raS.modificar(this.recursoac).subscribe((data)=>{
          this.raS.list().subscribe(data=>{
            this.raS.setlist(data);
          })
        })
      }else {
        let tr:TipoRecurso=new TipoRecurso();
        tr.iD=this.idTipoRecurso;
        let c:Curso=new Curso();
        c.idCurso=this.idCurso;
        this.raS.insert(this.recursoac).subscribe((data)=>{
          this.raS.list().subscribe(data =>{
            this.raS.setlist(data);
          })
        })
      }
      this.router.navigate(['recursoacademico']);
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
      this.raS.listarid(this.idTipoRecurso).subscribe((data:RecursoAcademico)=>{
        this.form=this.formBuilder.group({
          idRecursoAcademico:[data.iD],
          enlace:[data.enlaceRecurso],
          nombre:[data.nombreRecurso],
          autor:[data.autor],
          descripcion:[data.descripcion],
          fechaPublicacion:[data.fechaPublicacion],
          TipoRecursoDTO:[data.TipoRecursoDTO],
          CursoDTO:[data.CursoDTO]
        })
      })
    }
  }
}
