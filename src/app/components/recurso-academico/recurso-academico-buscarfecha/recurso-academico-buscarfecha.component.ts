import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { RecursoAcademico } from 'src/app/models/recurso-academico';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { LoginService } from 'src/app/services/login.service';
import { RecursoAcademicoService } from 'src/app/services/recurso-academico.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-recurso-academico-buscarfecha',
  templateUrl: './recurso-academico-buscarfecha.component.html',
  styleUrls: ['./recurso-academico-buscarfecha.component.css']
})
export class RecursoAcademicoBuscarfechaComponent implements OnInit{
  dataSource: MatTableDataSource<RecursoAcademico> = new MatTableDataSource<RecursoAcademico>();
  fechaForm: FormGroup = new FormGroup({});
  mensaje: string = '';
  fechaVacia: boolean = false;
  displayedColumns: string[] =
  ['id','enlace', 'nombre','autor', 'fecha Publicacion','descripcion','tipo de recurso','curso']
  
  role: string = "";
  username: string = "";
  id: number = 0;
  idiomaActivo: any;

  constructor(
    private uS: UsuariosService,
    private loginService: LoginService, 
    private raS:RecursoAcademicoService,
    private formBuilder: FormBuilder,
    private tuS: ConfiguracionService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.role=this.loginService.showRole();
    this.username=this.loginService.showUsername();

    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this.fechaForm = this.formBuilder.group({
      fecha: [null, Validators.required],
    });


    this.tuS.idiomaSubject.subscribe(idioma => {
      this.idiomaActivo = idioma;
      this.translate.use(this.idiomaActivo);
    });
    this.translate.use(this.idiomaActivo);
  }

  buscar() {
    if (this.fechaForm.valid) {
      const fechas = this.fechaForm.value.fecha.toISOString().substring(0, 10);
      this.raS.buscar(fechas).subscribe((data) => {        
        this.dataSource.data = data;       
        if (data.length == 0) {
          this.mensaje = "No se encontraron resultados para la fecha seleccionada.";
        } else {
          this.mensaje = '';
        }
      });
    } else {
      if (this.fechaForm.get('fecha')?.hasError('required')) {
        this.mensaje = 'Por favor, ingrese una fecha.';
      }
    }
  }


  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.fechaForm.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}
