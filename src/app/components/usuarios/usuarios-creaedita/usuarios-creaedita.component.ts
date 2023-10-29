import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios-creaedita',
  templateUrl: './usuarios-creaedita.component.html',
  styleUrls: ['./usuarios-creaedita.component.css']
})
export class UsuariosCreaeditaComponent {
  form: FormGroup = new FormGroup({});
  usuarios: Usuarios = new Usuarios();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  fechanacimiento = new FormControl(new Date());
  enabled: { value: string; viewValue: string }[] = [
    { value: 'true', viewValue: 'true' },
    { value: 'false', viewValue: 'false' },

  ];
  idUsuario: number = 0;
  edicion: boolean = false;
  constructor(
    private uS: UsuariosService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      enabled: ['', Validators.required],
      nombres: ['', [Validators.required]],
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      universidad: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.route.params.subscribe((data: Params) => {
      this.idUsuario= data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
  }
  registrar() {
    if (this.form.valid) {
        this.usuarios.username = this.form.value.username,
        this.usuarios.password = this.form.value.password,
        this.usuarios.enabled = this.form.value.enabled,
        this.usuarios.nombres = this.form.value.nombres,
        this.usuarios.apellidos = this.form.value.apellidos,
        this.usuarios.fechaNacimiento = this.form.value.fechaNacimiento,
        this.usuarios.universidad=this.form.value.universidad,
        this.usuarios.email=this.form.value.email,

        this.uS.insert(this.usuarios).subscribe(data=> {
          this.uS.list().subscribe(data=>{
            this.uS.setList(data);
          })
        })
        this.router.navigate(['usuarios']);

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
      this.uS.listarId(this.idUsuario).subscribe((data) => {
        this.form = new FormGroup({

        id: new FormControl(data.id),
        username: new FormControl(data.username),
        password: new FormControl(data.password),
        enabled:new FormControl(data.enabled),
        nombres:new FormControl(data.nombres),
        apellidos:new FormControl(data.apellidos),
        fechaNacimiento: new FormControl(data.fechaNacimiento),
        universidad:new FormControl(data.universidad),
        email:new FormControl(data.email),
        });
      });
    }
  }
}
