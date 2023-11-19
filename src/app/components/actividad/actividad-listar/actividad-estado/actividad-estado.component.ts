import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-actividad-estado',
  templateUrl: './actividad-estado.component.html',
  styleUrls: ['./actividad-estado.component.css']
})
export class ActividadEstadoComponent implements OnInit{
  form: FormGroup = new FormGroup({
    nombreActividad: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    calificacion: new FormControl({ value: '', disabled: true }),
  });
  
  getForm() {
    return this.form;
  }


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

    //VENTANA (1): Recibimos el parámetro del diálogo
    @Inject(MAT_DIALOG_DATA) public data: any,
    // Recibimos la referencia del diálogo
    private dialogRef: MatDialogRef<ActividadEstadoComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idActividad: [''],
      nombreActividad: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
      calificacion: ['', Validators.required],
      fecha: ['', Validators.required],
      horario: ['', Validators.required],
      tipoActividad: ['', Validators.required],
      curso: ['', Validators.required],
    });

    //VENTANA (2): ACTUALIZAR
    this.idActividad = this.data.idActividad;
    this.edicion = this.data.idActividad != null;
    this.init();


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

      this.aS.modificar(this.actividad).subscribe(/*(data) => {
        this.aS.list().subscribe((data) => {
        this.aS.setList(data);
       });
      }*/);
      // VENTANA (3): Cerramos el diálogo y devolvemos la actividad modificada        
      this.dialogRef.close(this.actividad);
      this.aplicarcambios();

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

  aplicarcambios() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      this.router.navigate(['/components/actividad/listar']);
    });
  }

}
