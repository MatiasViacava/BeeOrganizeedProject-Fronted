import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Horario } from 'src/app/models/horario';
import { Usuarios } from 'src/app/models/usuarios';
import { HorarioService } from 'src/app/services/horario.service';
import { LoginService } from 'src/app/services/login.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-horario-creaedita',
  templateUrl: './horario-creaedita.component.html',
  styleUrls: ['./horario-creaedita.component.css']
})
export class HorarioCreaeditaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  horario: Horario = new Horario();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  cierreCiclo = new FormControl(new Date());

  //ACTUALIZAR
  idHorario: number = 0;
  edicion: boolean = false;

  //DEPENDIENTES
  listaUsuarios: Usuarios[] = [];

  role: string = "";
  username: string = "";
  id: number = 0;

  titulo:string = "Registro de horario";

  constructor(
    private loginService: LoginService, 
    private hS: HorarioService,
    private router: Router,
    private formBuilder: FormBuilder,

    //ACTUALIZAR
    private route: ActivatedRoute,

    //DEPENDIENTES
    private uS: UsuariosService
  ) {}

  setIdUsuario(id:number){
    this.id=id;
  }

  ngOnInit(): void {
    this.role=this.loginService.showRole();
    this.username=this.loginService.showUsername();
    
    if (this.role=="Estudiante")
    {
      this.form = this.formBuilder.group({
        idHorario: [''],
        cierreCiclo: ['', Validators.required],
        usuario: [''],
      });
    }
    else if (this.role=="Administrador")
    {
      this.form = this.formBuilder.group({
        idHorario: [''],
        cierreCiclo: ['', Validators.required],
        usuario: ['', Validators.required],
      });
    }


    //ACTUALIZAR
    this.route.params.subscribe((data: Params) => {
      this.idHorario = data['idHorario'];
      this.edicion = data['idHorario'] != null;
      if (this.edicion) {this.titulo="Editar horario"}
      this.init();
    });

    this.uS.list().subscribe(usuarios =>
      {
        for (let u of usuarios)
        {
          if (u.username == this.username)
          {
            this.setIdUsuario(u.id);
          }
        }
      })

    //DEPENDIENTES
    this.uS.list().subscribe(data => { this.listaUsuarios = data });
  }

  registrar(): void {
    if (this.form.valid) {
      this.horario.idHorario = this.form.value.idHorario;
      this.horario.cierreCiclo = this.form.value.cierreCiclo;

      if (this.role=="Administrador") { this.horario.usuario.id = this.form.value.usuario;}
      else if (this.role == "Estudiante") {this.horario.usuario.id=this.id}
     

      if (this.edicion) {
        this.hS.modificar(this.horario).subscribe((data) => {
            this.hS.list().subscribe((data) => {
              if (this.role=='Administrador'){
              this.hS.setList(data);
              }});
        });
      } else {
        this.hS.insert(this.horario).subscribe((data) => {
          this.hS.list().subscribe((data) => {
            if (this.role=='Administrador'){
            this.hS.setList(data);
            }});
        });
      }
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
      this.hS.listarId(this.idHorario).subscribe((data) => {
        this.form = new FormGroup({
          idHorario: new FormControl(data.idHorario),
          cierreCiclo: new FormControl(data.cierreCiclo),
          usuario: new FormControl(data.usuario.id)
        });
      });
    }
  }

  aplicarcambios() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      this.router.navigate(['/components/horario/listar']);
    });
  }
}
