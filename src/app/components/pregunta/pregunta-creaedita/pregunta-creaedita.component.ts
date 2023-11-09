import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Encuesta } from 'src/app/models/encuesta';
import { Pregunta } from 'src/app/models/pregunta';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { PreguntaService } from 'src/app/services/pregunta.service';

@Component({
  selector: 'app-pregunta-creaedita',
  templateUrl: './pregunta-creaedita.component.html',
  styleUrls: ['./pregunta-creaedita.component.css']
})
export class PreguntaCreaeditaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  pregunta: Pregunta = new Pregunta();
  mensaje: string = '';

  listaEncuesta: Encuesta[] = [];

  idPregunta: number = 0;
  edicion: boolean = false;

  constructor(
    private pS: PreguntaService,
    private eS: EncuestaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idPregunta: [''],
      enunciado: ['', Validators.required],
      encuesta_id: ['', Validators.required]
    });

    this.route.params.subscribe((data: Params) => {
      this.idPregunta = data['idPregunta']; //xd
      this.edicion = data['idPregunta'] != null;
      this.init();
    });

    this.eS.list().subscribe(data => { this.listaEncuesta = data });

  }

  registrar() {
    if (this.form.valid) {
      this.pregunta.idPregunta = this.form.value.idPregunta,
        this.pregunta.enunciado = this.form.value.enunciado,
        this.pregunta.encuesta_id.idEncuesta = this.form.value.encuesta_id


      if (this.edicion) {
        this.pS.modificar(this.pregunta).subscribe((data) => {
          this.pS.list().subscribe(data => {
            this.pS.setList(data);
          })
        })
      } else {
        this.pS.insert(this.pregunta).subscribe((data) => {
          this.pS.list().subscribe(data => {
            this.pS.setList(data)
          })
        })
      }
      this.router.navigate(['/components/pregunta/listar']);

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
      this.pS.listarId(this.idPregunta).subscribe((data) => {
        this.form = new FormGroup({
          idPregunta: new FormControl(data.idPregunta),
          enunciado: new FormControl(data.enunciado),
          encuesta_id: new FormControl(data.encuesta_id.idEncuesta)

        });
      });
    }
  }
}
