import { Usuarios } from './../../../models/usuarios';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TipoUsuario } from 'src/app/models/tipousuario';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-tipousuario-creaedita',
  templateUrl: './tipousuario-creaedita.component.html',
  styleUrls: ['./tipousuario-creaedita.component.css']
})
export class TipousuarioCreaeditaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tipousuario: TipoUsuario = new TipoUsuario();
  mensaje: string = '';

  listaUsuarios: Usuarios[] = [];

  idTipoUsuario: number = 0;
  edicion: boolean = false;
  constructor(
    private tuS: TipoUsuarioService,
    private uS: UsuariosService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idTipoUsuario: [''],
      nombreTipoUsuario: ['', Validators.required],
      usuarios: ['', Validators.required]
    });

    this.route.params.subscribe((data: Params) => {
      this.idTipoUsuario = data['idTipoUsuario']; //xd
      this.edicion = data['idTipoUsuario'] != null;
      this.init();
    });

    this.uS.list().subscribe(data => { this.listaUsuarios = data });
  }
  registrar() {
    if (this.form.valid) {
      this.tipousuario.idTipoUsuario = this.form.value.idTipoUsuario,
        this.tipousuario.nombreTipoUsuario = this.form.value.nombreTipoUsuario,
        this.tipousuario.usuarios.id = this.form.value.usuarios

      if (this.edicion) {
        this.tuS.modificar(this.tipousuario).subscribe((data) => {
          this.tuS.list().subscribe(data => {
            this.tuS.setList(data);
          })
        })
      } else {
        this.tuS.insert(this.tipousuario).subscribe((data) => {
          this.tuS.list().subscribe(data => {
            this.tuS.setList(data)
          })
        })
      }
      this.router.navigate(['tipousuario']);

    } else {
      this.mensaje = "Complete todos los campos!!!!"
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
      this.tuS.listarId(this.idTipoUsuario).subscribe((data) => {
        this.form = new FormGroup({
          idTipoUsuario: new FormControl(data.idTipoUsuario),
          nombreTipoUsuario: new FormControl(data.nombreTipoUsuario),
          usuarios: new FormControl(data.usuarios.id)

        });
      });
    }
  }
}
