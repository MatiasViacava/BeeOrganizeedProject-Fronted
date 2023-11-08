import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Idioma } from 'src/app/models/idioma';
import { IdiomaService } from 'src/app/services/idioma.service';

@Component({
  selector: 'app-creaedita-idioma',
  templateUrl: './creaedita-idioma.component.html',
  styleUrls: ['./creaedita-idioma.component.css']
})
export class CreaeditaIdiomaComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  idioma: Idioma = new Idioma();
  mensaje: string = '';

  idIdioma: number = 0; //xd
  edicion: boolean = false;

  constructor(
    private iS: IdiomaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idIdioma: [''],
      nombreIdioma: ['', Validators.required]
    });

    this.route.params.subscribe((data: Params) => {
      this.idIdioma = data['idIdioma']; //xd
      this.edicion = data['idIdioma'] != null;
      this.init();
    });
  }

  registrar() {
    if (this.form.valid) {
      this.idioma.idIdioma = this.form.value.idIdioma,
        this.idioma.nombreIdioma = this.form.value.nombreIdioma

      if (this.edicion) {
        this.iS.modificar(this.idioma).subscribe((data) => {
          this.iS.list().subscribe(data => {
            this.iS.setList(data);
          })
        })
      } else {
        this.iS.insert(this.idioma).subscribe((data) => {
          this.iS.list().subscribe(data => {
            this.iS.setList(data)
          })
        })
      }
      this.router.navigate(['/components/idioma/listar']);

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
      this.iS.listarId(this.idIdioma).subscribe((data) => {
        this.form = new FormGroup({
          idIdioma: new FormControl(data.idIdioma),
          nombreIdioma: new FormControl(data.nombreIdioma)
        });
      });
    }
  }

}
