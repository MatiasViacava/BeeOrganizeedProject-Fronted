import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Curso } from 'src/app/models/curso';
import * as moment from 'moment'
import { CursosService } from 'src/app/services/cursos.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-cursos-creaedita',
  templateUrl: './cursos-creaedita.component.html',
  styleUrls: ['./cursos-creaedita.component.css']
})

export class CursosCreaeditaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  curso: Curso = new Curso();
  mensaje: string = '';
  minFecha: Date = moment().add('days').toDate();
  maxFecha: Date = moment().endOf('year').toDate();
  fechaInicioCurso = new FormControl(new Date());
  fechaFinCurso = new FormControl(new Date());

  edicion:boolean=false;
  idCurso:number=0;

  constructor(
    private cS: CursosService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idCurso: [''],
      nombreCurso: ['', Validators.required],
      descripcionCurso: ['', Validators.required],
      fechaInicioCurso: ['', [Validators.required]],
      fechaFinCurso: ['', Validators.required],
    });

    this.route.params.subscribe((data: Params) => {
      this.idCurso = data['idCurso'];
      this.edicion = data['idCurso'] != null;
      this.init();
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.curso.idCurso=this.form.value.idCurso;
      this.curso.nombreCurso = this.form.value.nombreCurso;
      this.curso.descripcionCurso = this.form.value.descripcionCurso;
      this.curso.fechaInicioCurso = this.form.value.fechaInicioCurso;
      this.curso.fechaFinCurso = this.form.value.fechaFinCurso;

      if(this.edicion){
        this.cS.modificar(this.curso).subscribe((data) => {
          this.cS.list().subscribe(data => {
            this.cS.setList(data);
          })
        })
      } else {
        this.cS.insert(this.curso).subscribe((data) => {
          this.cS.list().subscribe(data => {
            this.cS.setList(data)
          })
        })
      }

      this.router.navigate(['cursos']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  init() {
    if (this.edicion) {
      this.cS.listarId(this.idCurso).subscribe((data) => {
        this.form = this.formBuilder.group({
          idCurso: [data.idCurso],
          nombreCurso: [data.nombreCurso],
          descripcionCurso: [data.descripcionCurso],
          fechaInicioCurso: [data.fechaInicioCurso],
          fechaFinCurso: [data.fechaFinCurso],
        });
      });
    }
  }
  
}

