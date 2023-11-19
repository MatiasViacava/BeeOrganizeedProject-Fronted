import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Actividad } from 'src/app/models/actividad';
import { ActividadService } from 'src/app/services/actividad.service';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { LoginService } from 'src/app/services/login.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ActividadEstadoComponent } from './actividad-estado/actividad-estado.component';
import { ActividadConfirmarComponent } from './actividad-confirmar/actividad-confirmar.component';

@Component({
  selector: 'app-actividad-listar',
  templateUrl: './actividad-listar.component.html',
  styleUrls: ['./actividad-listar.component.css']
})
export class ActividadListarComponent implements OnInit{
  dataSource: MatTableDataSource<Actividad> = new MatTableDataSource();
  displayedColumns: string[] =
  ['idActividad', 'nombreActividad', 'descripcion', 'estado', 'calificacion', 'fecha', 'horario', 'tipoActividad', 'curso', 'actualizar','eliminar']
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  role: string = "";
  username: string = "";
  id: number = 0;
  idiomaActivo: any;

  //ESTADO - NUEVO
  idSeleccionado: number = 0;

  constructor(
    public route: ActivatedRoute, 
    private router: Router, 
    private aS: ActividadService, 
    private loginService: LoginService, 
    private uS: UsuariosService,
    private tuS: ConfiguracionService,
    public translate: TranslateService,
    private dialog: MatDialog //ESTADO - NUEVO
  ) {}

  ngOnInit(): void {
    this.role=this.loginService.showRole();
    this.username=this.loginService.showUsername();

    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');


    if (this.role=='Estudiante')
    {    this.uS.list().subscribe(data=>{
      for (let u of data) {if (u.username==this.username) 
        {this.id=u.id;
          
        this.aS.listporusuarioid(this.id).subscribe((data)=>{
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        });

        this.aS.getList().subscribe((data) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        });
        //ELIMINAR - NUEVO
        this.aS.getConfirmDelete().subscribe(data => {
          data == true ? this.eliminar(this.idSeleccionado) : false;
          this.ngOnInit()
        }); 
        }

        this.tuS.idiomaSubject.subscribe(idioma => {
          this.idiomaActivo = idioma;
          this.translate.use(this.idiomaActivo);
        });
        this.translate.use(this.idiomaActivo);
      }
    })}
    else if (this.role=='Administrador')
    {
      this.aS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
      this.aS.getList().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
      //ELIMINAR - NUEVO
      this.aS.getConfirmDelete().subscribe(data => {
        data == true ? this.eliminar(this.idSeleccionado) : false;
        this.ngOnInit()
      }); 
    }
  }
  eliminar(idActividad: number){
    this.aS.eliminar(idActividad).subscribe(() => {
      this.aS.list().subscribe((data) => {
        if (this.role=='Administrador'){this.aS.setList(data);}
        else if (this.role=='Estudiante') {this.reloadCurrentRoute()}})
    });
  }
  iralink(comp1:string, comp2:string){
    this.router.navigate(['components/actividad/',comp1, comp2]);
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  //ESTADO-NUEVO 
  estado(id: number) {
    this.idSeleccionado = id;
    // Pasamos el id del tipo de actividad al diálogo
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {idActividad: id};
    // Usamos el componente de creación y edición como diálogo
    this.dialog.open(ActividadEstadoComponent, dialogConfig);
  }
  confirmar(id: number) {
    this.idSeleccionado = id;
    this.dialog.open(ActividadConfirmarComponent);
  }

}
