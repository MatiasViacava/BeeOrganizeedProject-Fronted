import { TipoRecurso } from './../../../models/tiporecurso';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TipoRecursoService } from 'src/app/services/tipo-recurso.service';

@Component({
  selector: 'app-tipo-recurso-creaedita',
  templateUrl: './tipo-recurso-creaedita.component.html',
  styleUrls: ['./tipo-recurso-creaedita.component.css']
})
export class TipoRecursoCreaeditaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  TipoRecurso: TipoRecurso = new TipoRecurso();
  mensaje: string = '';
  iDTipoRecurso: number = 0; //xd
  edicion: boolean = false;
  constructor(
    private taS: TipoRecursoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      iD: [''],
      nombreTipo: ['', Validators.required]
    });

    this.route.params.subscribe((data: Params) => {
      this.iDTipoRecurso= data['iD']; //xd
      this.edicion = data['iD'] != null;
      this.init();
    });
  }
  registrar() {
    if (this.form.valid) {
        this.TipoRecurso.iD=this.form.value.iD,
        this.TipoRecurso.nombreTipo = this.form.value.nombreTipo

        if(this.edicion){
          this.taS.modificar(this.TipoRecurso).subscribe((data) => {
            this.taS.list().subscribe(data => {
              this.taS.setList(data);
            })
          })
        } else {
          this.taS.insert(this.TipoRecurso).subscribe((data) => {
            this.taS.list().subscribe(data => {
              this.taS.setList(data)
            })
          })
        }
        this.router.navigate(['/components/tiporecurso/listar']);
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
      this.taS.listarId(this.iDTipoRecurso).subscribe((data) => {
        this.form = new FormGroup({
        iD: new FormControl(data.iD),
        nombreTipo: new FormControl(data.nombreTipo)
        });
      });
    }
  }
}
