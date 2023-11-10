import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Configuracion } from 'src/app/models/configuracion';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { LoginService } from 'src/app/services/login.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-configuracion-listar',
  templateUrl: './configuracion-listar.component.html',
  styleUrls: ['./configuracion-listar.component.css']
})
export class ConfiguracionListarComponent {
  dataSource: MatTableDataSource<Configuracion> = new MatTableDataSource();
  displayedColumns: string[] =
  ['codigo', 'color','idioma_id','usuario_id','actualizar','eliminar']
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  role: string = "";
  username: string = "";
  id: number = 0;
  
  constructor(
    public route: ActivatedRoute, 
    private router: Router, 
    private tuS: ConfiguracionService, 
    private loginService: LoginService, 
    private uS: UsuariosService) {}

  ngOnInit(): void {
    this.role=this.loginService.showRole();
    this.username=this.loginService.showUsername();
    if (this.role=='Estudiante')
    {    this.uS.list().subscribe(data=>{
      for (let u of data) {if (u.username==this.username) 
        {this.id=u.id;
          
        this.tuS.listporusuarioid(this.id).subscribe((data)=>{
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        });

        this.tuS.getList().subscribe((data) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        });
        }
      }
    })}
    else if (this.role=='Administrador')
    {
      this.tuS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
      this.tuS.getList().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      }); 
    }
  }
  eliminar(idConfiguracion: number){
    this.tuS.eliminar(idConfiguracion).subscribe(() => {
      this.tuS.list().subscribe(data => {
        this.tuS.setList(data);
      });
    });
  }
  iralink(comp1:string, comp2:string){
    this.router.navigate(['components/configuracion/',comp1, comp2]);
  }
}
