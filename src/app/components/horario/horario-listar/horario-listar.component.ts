import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Horario } from 'src/app/models/horario';
import { HorarioService } from 'src/app/services/horario.service';
import { LoginService } from 'src/app/services/login.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfiguracionService } from 'src/app/services/configuracion.service';


@Component({
  selector: 'app-horario-listar',
  templateUrl: './horario-listar.component.html',
  styleUrls: ['./horario-listar.component.css']
})
export class HorarioListarComponent implements OnInit {
  dataSource: MatTableDataSource<Horario> = new MatTableDataSource();
  displayedColumns: string[] =
    ['idHorario', 'cierreCiclo', 'usuario', 'actualizar', 'eliminar']
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  role: string = "";
  username: string = "";
  id: number = 0;
  idiomaActivo: any;


  constructor(
    public route: ActivatedRoute, 
    private router: Router, 
    private hS: HorarioService, 
    private loginService: LoginService, 
    private uS: UsuariosService,
    private tuS: ConfiguracionService,
    public translate: TranslateService) { }

  ngOnInit(): void {

    this.role=this.loginService.showRole();
    this.username=this.loginService.showUsername();
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    if (this.role=='Estudiante')
    {    this.uS.list().subscribe(data=>{
      for (let u of data) {if (u.username==this.username) 
        {this.id=u.id;
          
        this.hS.listporusuarioid(this.id).subscribe((data)=>{
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        });

        this.hS.getList().subscribe((data) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
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
      this.hS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
      this.hS.getList().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      }); 
    }

  }
  eliminar(idHorario: number) {
    this.hS.eliminar(idHorario).subscribe(() => {
      this.hS.list().subscribe((data) => {
        if (this.role=='Administrador'){this.hS.setList(data);}
        else if (this.role=='Estudiante') {this.reloadCurrentRoute()}});
    });
  }
  iralink(comp1:string, comp2:string){
    this.router.navigate(['components/horario/',comp1, comp2]);
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
