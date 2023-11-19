import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Respuesta } from 'src/app/models/respuesta';
import { LoginService } from 'src/app/services/login.service';
import { RespuestaService } from 'src/app/services/respuesta.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { MatDialog } from '@angular/material/dialog';
import { RespuestaConfirmarComponent } from './respuesta-confirmar/respuesta-confirmar.component';


@Component({
  selector: 'app-respuesta-listar',
  templateUrl: './respuesta-listar.component.html',
  styleUrls: ['./respuesta-listar.component.css']
})
export class RespuestaListarComponent implements OnInit{

  dataSource: MatTableDataSource<Respuesta> = new MatTableDataSource();
  displayedColumns: string[] =
  ['idRespuesta', 'contenido','pregunta_Id', 'actualizar','eliminar']
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  role: string = "";
  username: string = "";
  id: number = 0;
  idiomaActivo: any;

  idSeleccionado: number = 0;

  constructor(
    public route: ActivatedRoute, 
    private router: Router, 
    private rS: RespuestaService,
     private loginService: LoginService, 
     private uS: UsuariosService,
     private tuS: ConfiguracionService,
    public translate: TranslateService,
    private dialog: MatDialog
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
          
        this.rS.listporusuarioid(this.id).subscribe((data)=>{
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        });

        this.rS.getList().subscribe((data) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        });
        //ELIMINAR - NUEVO
        this.rS.getConfirmDelete().subscribe(data => {
          data == true ? this.eliminar(this.idSeleccionado) : false;
          this.ngOnInit()
        });

        this.tuS.idiomaSubject.subscribe(idioma => {
          this.idiomaActivo = idioma;
          this.translate.use(this.idiomaActivo);
        });
        this.translate.use(this.idiomaActivo);

        }
      }
    })}
    else if (this.role=='Administrador')
    {
      this.rS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
      this.rS.getList().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      }); 
    }
  }
  eliminar(idRespuesta: number){
    this.rS.eliminar(idRespuesta).subscribe(() => {
      this.rS.list().subscribe((data) => {
        if (this.role=='Administrador'){this.rS.setList(data);}
        else if (this.role=='Estudiante') {this.reloadCurrentRoute()}})
    });
  }
  confirmar(id: number) {
    this.idSeleccionado = id;
    this.dialog.open(RespuestaConfirmarComponent);
  }
  iralink(comp1:string, comp2:string){
    this.router.navigate(['components/respuesta/',comp1, comp2]);
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
 
}
