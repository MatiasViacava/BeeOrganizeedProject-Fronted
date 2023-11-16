import { LoginService } from './../../../services/login.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/models/curso';
import { CursosService } from 'src/app/services/cursos.service';
import { CursosConfirmarComponent } from './cursos-confirmar/cursos-confirmar.component';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfiguracionService } from 'src/app/services/configuracion.service';


@Component({
  selector: 'app-cursos-listar',
  templateUrl: './cursos-listar.component.html',
  styleUrls: ['./cursos-listar.component.css']
})
export class CursosListarComponent implements OnInit{
  dataSource: MatTableDataSource<Curso> = new MatTableDataSource();
  displayedColumns: string[] =
  ['codigo', 'nombre', 'descripcion', 'fechainicio', 'fechafin', 'actualizar','eliminar']
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  role: string = "";
  username: string = "";
  id: number = 0;
  idiomaActivo: any;

  constructor(
    public route: ActivatedRoute, 
    private router: Router,
    private cS: CursosService,    
    private dialog: MatDialog,
    private loginService: LoginService, 
    private uS: UsuariosService,
    public translate: TranslateService,
    private tuS: ConfiguracionService,
    ) {}

  idSeleccionado: number = 0;

  ngOnInit(): void {
    this.role=this.loginService.showRole();
    this.username=this.loginService.showUsername();
    
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    if (this.role=='EstudianteSinUsar')
    {    this.uS.list().subscribe(data=>{
      for (let u of data) {if (u.username==this.username) 
        {this.id=u.id;
          
        this.cS.listporusuarioid(this.id).subscribe((data)=>{
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        });

        this.cS.getList().subscribe((data) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        });
        }

        this.tuS.idiomaSubject.subscribe(idioma => {
          this.idiomaActivo = idioma;
          this.translate.use(this.idiomaActivo);
        });
        this.translate.use(this.idiomaActivo);
      }
    })}
    else if (this.role=='Administrador' || this.role=='Estudiante')
    {
      this.cS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
      this.cS.getList().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      }); 
    }

    this.cS.getConfirmDelete().subscribe(data => {
      data == true ? this.eliminar(this.idSeleccionado) : false;
      this.ngOnInit()
    }); 
  }
  eliminar(idTipoAcitvidad: number){
    this.cS.eliminar(idTipoAcitvidad).subscribe(() => {
      this.cS.list().subscribe((data) => {
        if (this.role=='Administrador'){this.cS.setList(data);}
        else if (this.role=='Estudiante') {this.reloadCurrentRoute()}})
      })
      
  }

  confirmar(id: number) {
    this.idSeleccionado = id;
    this.dialog.open(CursosConfirmarComponent);
  }

  iralink(comp1:string, comp2:string){
    this.router.navigate(['components/cursos/',comp1, comp2]);
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}