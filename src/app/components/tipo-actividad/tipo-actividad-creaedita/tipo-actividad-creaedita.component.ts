import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TipoActividad } from 'src/app/models/tipoactividad';
import { TipoActividadService } from 'src/app/services/tipo-actividad.service';

@Component({
  selector: 'app-tipo-actividad-creaedita',
  templateUrl: './tipo-actividad-creaedita.component.html',
  styleUrls: ['./tipo-actividad-creaedita.component.css']
})
export class TipoActividadCreaeditaComponent {
  form: FormGroup = new FormGroup({});
  TipoActividad: TipoActividad = new TipoActividad();
  mensaje: string = '';
  
  iDTipoActividad: number = 0; //xd
  edicion: boolean = false;

  constructor(
    private taS: TipoActividadService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      iDTipoActividad: [''],
      nombreTipoActividad: ['', Validators.required]
    });

    this.route.params.subscribe((data: Params) => {
      this.iDTipoActividad= data['iDTipoActividad']; //xd
      this.edicion = data['iDTipoActividad'] != null;
      this.init();
    });
  }

  registrar() {
    if (this.form.valid) {
        this.TipoActividad.iDTipoActividad=this.form.value.iDTipoActividad,
        this.TipoActividad.nombreTipoActividad = this.form.value.nombreTipoActividad

        if(this.edicion){
          this.taS.modificar(this.TipoActividad).subscribe((data) => {
            this.taS.list().subscribe(data => {
              this.taS.setList(data);
            })
          })
        } else {
          this.taS.insert(this.TipoActividad).subscribe((data) => {
            this.taS.list().subscribe(data => {
              this.taS.setList(data)
            })
          })
        }
        this.router.navigate(['tipoactividad']);

    } else {
      this.mensaje="Complete todos los campos!!!!"
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
      this.taS.listarId(this.iDTipoActividad).subscribe((data) => {
        this.form = new FormGroup({
        iDTipoActividad: new FormControl(data.iDTipoActividad),
        nombreTipoActividad: new FormControl(data.nombreTipoActividad)
        });
      });
    }
  }
}
