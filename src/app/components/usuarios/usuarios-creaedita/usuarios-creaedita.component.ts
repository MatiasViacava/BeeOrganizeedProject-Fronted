import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { TipoUsuario } from 'src/app/models/tipousuario';
import { Usuarios } from 'src/app/models/usuarios';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios-creaedita',
  templateUrl: './usuarios-creaedita.component.html',
  styleUrls: ['./usuarios-creaedita.component.css']
})
export class UsuariosCreaeditaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuarios: Usuarios = new Usuarios();
  tipousuario: TipoUsuario = new TipoUsuario();

  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  fechanacimiento = new FormControl(new Date());

  idUsuario: number = 0;
  edicion: boolean = false;
  constructor(
    private uS: UsuariosService,

    private tuS: TipoUsuarioService,

    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      nombres: ['', [Validators.required]],
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      universidad: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.route.params.subscribe((data: Params) => {
      this.idUsuario = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

  }
  registrar() {

    if (this.form.valid) {
        this.usuarios.id = this.form.value.id,
        this.usuarios.username = this.form.value.username,
        this.usuarios.password = this.form.value.password,
        this.usuarios.nombres = this.form.value.nombres,
        this.usuarios.apellidos = this.form.value.apellidos,
        this.usuarios.fechaNacimiento = this.form.value.fechaNacimiento,
        this.usuarios.universidad = this.form.value.universidad,
        this.usuarios.email = this.form.value.email;

      this.uS.list().subscribe(data2 => {
        let camposunicos: boolean = true;
        for (let u of data2) {
          if (this.form.value.username == u.username && this.form.value.id != u.id) {
            camposunicos = false;
            this.mensaje = "El nombre de usuario ya existe"
          }
          if (this.form.value.email == u.email && this.form.value.id != u.id) {
            camposunicos = false;
            this.mensaje = "El email ya está asociado con otra cuenta"
          }
        }

        if (camposunicos) {
          if (this.edicion) {
            this.uS.actualizarusuario(this.usuarios.id,this.usuarios.username,'true',this.usuarios.password,
              this.usuarios.nombres, this.usuarios.apellidos, this.usuarios.fechaNacimiento.toString(),
              this.usuarios.universidad, this.usuarios.email).subscribe((data) => {
              this.uS.list().subscribe(data => {
                this.uS.setList(data);
              })
            })
          } else {

            this.uS.insert(this.usuarios).subscribe((data) => {
              this.uS.list().subscribe(data => {
                
                this.uS.setList(data)

                this.uS.ultimousuariocreado().subscribe(data2 => {
                  console.log(data2)
                  this.uS.list().subscribe(data3 => {
                    for (let u of data3) {
                      if (u.username == this.usuarios.username) {
                        this.tipousuario.nombreTipoUsuario = "Estudiante"
                        this.tipousuario.usuarios.id = u.id
                        console.log('Se ha creado un tipo de usuario para ' + u.username)
    
                        this.tuS.insert(this.tipousuario).subscribe((data4) => {
                          this.tuS.list().subscribe(data4 => {
                            this.tuS.setList(data4)
                          })
                        })
                      }
                    }
    
                  })
                })
              })
            })
          }
          this.router.navigate(['/components/usuarios/listar']);
        }
      })
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
  //init() {
  //  if (this.edicion) {
  //    this.uS.listarId(this.idUsuario).subscribe((data) => {
  //      this.form = new FormGroup({
  //      id: new FormControl(data.id),
  //      username: new FormControl(data.username),
  //      password: new FormControl(data.password),
  //      nombres:new FormControl(data.nombres),
  //      apellidos:new FormControl(data.apellidos),
  //      fechaNacimiento: new FormControl(data.fechaNacimiento),
  //      universidad:new FormControl(data.universidad),
  //      email:new FormControl(data.email),
  //      });
  //    });
  //  }
  //}
  init() {
    if (this.edicion) {
      this.uS.listarId(this.idUsuario).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          username: new FormControl(data.username),
          password: new FormControl(data.password),
          nombres: new FormControl(data.nombres),
          apellidos: new FormControl(data.apellidos),
          fechaNacimiento: new FormControl(data.fechaNacimiento),
          universidad: new FormControl(data.universidad),
          email: new FormControl(data.email),
        });
      });
    } else {
      this.form = this.formBuilder.group({
        id: [''],
        username: ['', Validators.required],
        password: ['', Validators.required],
        nombres: ['', [Validators.required]],
        apellidos: ['', Validators.required],
        fechaNacimiento: [new Date()], // establece la fecha de hoy
        universidad: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      });
    }
  }
}
