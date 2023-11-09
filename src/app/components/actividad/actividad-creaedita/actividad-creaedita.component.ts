import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Actividad } from 'src/app/models/actividad';
import { Curso } from 'src/app/models/curso';
import { Horario } from 'src/app/models/horario';
import { TipoActividad } from 'src/app/models/tipoactividad';
import { ActividadService } from 'src/app/services/actividad.service';
import { CursosService } from 'src/app/services/cursos.service';
import { HorarioService } from 'src/app/services/horario.service';
import { TipoActividadService } from 'src/app/services/tipo-actividad.service';

@Component({
  selector: 'app-actividad-creaedita',
  templateUrl: './actividad-creaedita.component.html',
  styleUrls: ['./actividad-creaedita.component.css']
})
export class ActividadCreaeditaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  actividad: Actividad = new Actividad();
  mensaje: string = '';
  minFecha: Date = moment().add('days').toDate();
  cierreCiclo = new FormControl(new Date());
  tipos: { value: string, viewValue: string }[] = [{ value: 'Completo', viewValue: 'Completo' },
  { value: 'Incompleto', viewValue: 'Incompleto' },{ value: 'Cancelado', viewValue: 'Cancelado' }]

  //ACTUALIZAR
  idActividad: number = 0;
  edicion: boolean = false;

  //DEPENDIENTES
  listaHorarios: Horario[] = [];
  listaTipoActividades: TipoActividad[] = [];
  listaCurso: Curso[] = [];

  constructor(
    private aS: ActividadService,
    private router: Router,
    private formBuilder: FormBuilder,

    //ACTUALIZAR
    private route: ActivatedRoute,

    //DEPENDIENTES
    private hS: HorarioService,
    private taS: TipoActividadService,
    private cS: CursosService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idActividad: [''],
      nombreActividad: ['', Validators.required],
      descripcion: ['', Validators.required],
      //estado: ['', Validators.required],
      estado: [this.edicion ? '' : 'Incompleto', Validators.required],
      //calificacion: ['', Validators.required],
      calificacion: [this.edicion ? '' : 0, Validators.required],
      fecha: ['', Validators.required],
      horario: ['', Validators.required],
      tipoActividad: ['', Validators.required],
      curso: ['', Validators.required],
    });

    //ACTUALIZAR
    this.route.params.subscribe((data: Params) => {
      this.idActividad = data['idActividad'];
      this.edicion = data['idActividad'] != null;
      this.init();
    });

    //DEPENDIENTES
    this.hS.list().subscribe(data => { this.listaHorarios = data });
    this.taS.list().subscribe(data => { this.listaTipoActividades = data });
    this.cS.list().subscribe(data => { this.listaCurso = data });
  }

  registrar(): void {
    if (this.form.valid) {
      this.actividad.idActividad = this.form.value.idActividad;
      this.actividad.nombreActividad = this.form.value.nombreActividad;
      this.actividad.descripcion = this.form.value.descripcion;
      this.actividad.estado = this.form.value.estado;
      this.actividad.calificacion = this.form.value.calificacion;
      this.actividad.fecha = this.form.value.fecha;
      this.actividad.horario.idHorario = this.form.value.horario;
      this.actividad.tipoActividad.iDTipoActividad = this.form.value.tipoActividad;
      this.actividad.curso.idCurso = this.form.value.curso;

      

      if (this.edicion) {
        this.aS.modificar(this.actividad).subscribe((data) => {
          this.aS.list().subscribe((data) => {
          this.aS.setList(data);
          });
        });
      } else {
        this.aS.insert(this.actividad).subscribe((data) => {
          this.aS.list().subscribe((data) => {
          this.aS.setList(data);
          });
        });
      }
      this.router.navigate(['/components/actividad/listar']);

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
      this.aS.listarId(this.idActividad).subscribe((data) => {
        this.form = new FormGroup({
          idActividad: new FormControl(data.idActividad),
          nombreActividad: new FormControl(data.nombreActividad),
          descripcion: new FormControl(data.descripcion),
          estado: new FormControl(data.estado),
          calificacion: new FormControl(data.calificacion),
          fecha: new FormControl(data.fecha),
          horario: new FormControl(data.horario.idHorario),
          tipoActividad: new FormControl(data.tipoActividad.iDTipoActividad),
          curso: new FormControl(data.curso.idCurso)
        });
      });
    }
  }
}
