import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pregunta } from 'src/app/models/pregunta';
import { Respuesta } from 'src/app/models/respuesta';
import { LoginService } from 'src/app/services/login.service';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { RespuestaService } from 'src/app/services/respuesta.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfiguracionService } from 'src/app/services/configuracion.service';


@Component({
  selector: 'app-respuesta-creaedita',
  templateUrl: './respuesta-creaedita.component.html',
  styleUrls: ['./respuesta-creaedita.component.css']
})
export class RespuestaCreaeditaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  respuesta: Respuesta = new Respuesta();
  mensaje: string = '';

  listaPregunta: Pregunta[] = [];

  idRespuesta: number = 0;
  edicion: boolean = false;

  role: string = "";
  username: string = "";
  id: number = 0;
  idiomaActivo: any;


  constructor(
    private loginService: LoginService, 
    private rS: RespuestaService,
    private pS: PreguntaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private tuS: ConfiguracionService,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.role=this.loginService.showRole();
    this.username=this.loginService.showUsername();

    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this.form = this.formBuilder.group({
      idRespuesta: [''],
      contenido: ['', Validators.required],
      pregunta_Id: ['', Validators.required]
    });

    this.route.params.subscribe((data: Params) => {
      this.idRespuesta = data['idRespuesta']; //xd
      this.edicion = data['idRespuesta'] != null;
      this.init();
    });

    this.tuS.idiomaSubject.subscribe(idioma => {
      this.idiomaActivo = idioma;
      this.translate.use(this.idiomaActivo);
    });
    this.translate.use(this.idiomaActivo);

    this.pS.list().subscribe(data => { this.listaPregunta = data });

  }

  registrar() {
    if (this.form.valid) {
      this.respuesta.idRespuesta = this.form.value.idRespuesta,
        this.respuesta.contenido = this.form.value.contenido,

        this.respuesta.pregunta_Id.idPregunta = this.form.value.pregunta_Id


      if (this.edicion) {
        this.rS.modificar(this.respuesta).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            if (this.role=='Administrador'){this.rS.setList(data);}
            })
        })
      } else {
        this.rS.insert(this.respuesta).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            if (this.role=='Administrador'){this.rS.setList(data);}
            })
        })
      }
      this.router.navigate(['/components/respuesta/listar']);

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
      this.rS.listarId(this.idRespuesta).subscribe((data) => {
        this.form = new FormGroup({
          idRespuesta: new FormControl(data.idRespuesta),
          contenido: new FormControl(data.contenido),
          pregunta_Id: new FormControl(data.pregunta_Id.idPregunta)

        });
      });
    }
  }
}
