import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Encuesta } from 'src/app/models/encuesta';
import { Usuarios } from 'src/app/models/usuarios';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-encuesta-creaedita',
  templateUrl: './encuesta-creaedita.component.html',
  styleUrls: ['./encuesta-creaedita.component.css']
})
export class EncuestaCreaeditaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  encuesta: Encuesta = new Encuesta();
  mensaje: string = '';

  listaUsuarios: Usuarios[] = []; //

  idEncuesta: number = 0;
  edicion: boolean = false;
  constructor(
    private eS: EncuestaService,
    private uS: UsuariosService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idEncuesta: [''],
      nombreEncuesta: ['', Validators.required],
      comentario: ['', Validators.required],
      usuario: ['', Validators.required]
    });

    this.route.params.subscribe((data: Params) => {
      this.idEncuesta = data['idEncuesta'];
      this.edicion = data['idEncuesta'] != null;
      this.init();
    });

    this.uS.list().subscribe(data => { this.listaUsuarios = data });
  }
  registrar() {
    if (this.form.valid) {
      this.encuesta.idEncuesta = this.form.value.idEncuesta,
        this.encuesta.nombreEncuesta = this.form.value.nombreEncuesta,
        this.encuesta.comentario = this.form.value.comentario,
        this.encuesta.usuario.id = this.form.value.usuario

      if (this.edicion) {

        this.eS.modificar(this.encuesta).subscribe((data) => {
          this.eS.list().subscribe(data => {
            this.eS.setList(data);
          })
        })
      } else {
        this.eS.insert(this.encuesta).subscribe((data) => {
          this.eS.list().subscribe(data => {
            this.eS.setList(data)
          })
        })
      }
      this.router.navigate(['/components/encuestas/listar']);

    } else {
      this.mensaje = "Por favor complete todos los campos obligatorios."
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
      this.eS.listarId(this.idEncuesta).subscribe((data) => {
        this.form = new FormGroup({
          idEncuesta: new FormControl(data.idEncuesta),
          nombreEncuesta: new FormControl(data.nombreEncuesta),
          comentario: new FormControl(data.comentario),
          usuario: new FormControl(data.usuario.id)
        });
      });
    }
  }

}
