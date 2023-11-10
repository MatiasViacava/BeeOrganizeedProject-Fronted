import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Respuesta } from 'src/app/models/respuesta';
import { LoginService } from 'src/app/services/login.service';
import { RespuestaService } from 'src/app/services/respuesta.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

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

  constructor(
    public route: ActivatedRoute, 
    private router: Router, 
    private rS: RespuestaService,
     private loginService: LoginService, 
     private uS: UsuariosService) {}

  ngOnInit(): void {
    this.role=this.loginService.showRole();
    this.username=this.loginService.showUsername();
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
      this.rS.list().subscribe(data => {
        this.rS.setList(data);
      });
    });
  }
  iralink(comp1:string, comp2:string){
    this.router.navigate(['components/respuesta/',comp1, comp2]);
  }
 
}
