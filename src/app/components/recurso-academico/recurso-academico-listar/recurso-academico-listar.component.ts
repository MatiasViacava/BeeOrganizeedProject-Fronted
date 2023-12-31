import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RecursoAcademico } from 'src/app/models/recurso-academico';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { LoginService } from 'src/app/services/login.service';
import { RecursoAcademicoService } from 'src/app/services/recurso-academico.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ConfirmarComponent } from './confirmar/confirmar.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-recurso-academico-listar',
  templateUrl: './recurso-academico-listar.component.html',
  styleUrls: ['./recurso-academico-listar.component.css']
})
export class RecursoAcademicoListarComponent implements OnInit{
  dataSource: MatTableDataSource<RecursoAcademico> = new MatTableDataSource();
  displayedColumns: string[] =
  ['id','enlace', 'nombre','autor', 'fecha Publicacion','descripcion','tipo de recurso','curso','actualizar','eliminar']
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  role: string = "";
  username: string = "";
  id: number = 0;
  idiomaActivo: any;

  idSeleccionado: number = 0;
  constructor(
    public route: ActivatedRoute, 
    private router: Router, 
    private raS:RecursoAcademicoService, 
    private loginService: LoginService, 
    private dialog: MatDialog,
    private uS: UsuariosService,
    private tuS: ConfiguracionService,
    public translate: TranslateService) {}

  ngOnInit(): void {
    this.role=this.loginService.showRole();
    this.username=this.loginService.showUsername();
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    /*if (this.role=='Estudiante'){
      this.uS.list().subscribe(data=>{
      for (let u of data) {if (u.username==this.username) 
        {this.id=u.id;
          
        this.raS.listporusuarioid(this.id).subscribe((data)=>{
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        });

        this.raS.getlist().subscribe((data) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        });

        this.tuS.idiomaSubject.subscribe(idioma => {
          this.idiomaActivo = idioma;
          this.translate.use(this.idiomaActivo);
        });
        this.translate.use(this.idiomaActivo);
        }

        //ELIMINAR - NUEVO
        this.raS.getConfirmDelete().subscribe(data => {
          data == true ? this.eliminar(this.idSeleccionado) : false;
          this.ngOnInit()
        }); 


      }
    })
   }*/
   
    if (this.role=='Administrador' || this.role=='Estudiante')
    {
      this.raS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
      this.raS.getlist().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      }); 

      //ELIMINAR - NUEVO
      this.raS.getConfirmDelete().subscribe(data => {
        data == true ? this.eliminar(this.idSeleccionado) : false;
        this.ngOnInit()
      }); 
    }
  }

  confirmar(id: number) {
    this.idSeleccionado = id;
    this.dialog.open(ConfirmarComponent);
  }
  eliminar(iD: number){
    this.raS.eliminar(iD).subscribe(() => {
      this.raS.list().subscribe((data) => {
        if (this.role=='Administrador'){this.raS.setlist(data);}
        else if (this.role=='Estudiante') {this.reloadCurrentRoute()}})
    });
  }
  iralink(comp1:string, comp2:string){
    this.router.navigate(['components/recursoacademico/',comp1, comp2]);
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  
}
