import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { RecursoAcademico } from 'src/app/models/recurso-academico';
import { LoginService } from 'src/app/services/login.service';
import { RecursoAcademicoService } from 'src/app/services/recurso-academico.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

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

  constructor(
    public route: ActivatedRoute, 
    private router: Router, 
    private raS:RecursoAcademicoService, 
    private loginService: LoginService, 
    private uS: UsuariosService) {}

  ngOnInit(): void {
    this.role=this.loginService.showRole();
    this.username=this.loginService.showUsername();
    if (this.role=='Estudiante')
    {    this.uS.list().subscribe(data=>{
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
        }
      }
    })}
    else if (this.role=='Administrador')
    {
      this.raS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
      this.raS.getlist().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      }); 
    }
  }
  eliminar(iD: number){
    this.raS.eliminar(iD).subscribe(() => {
      this.raS.list().subscribe(data => {
        this.raS.setlist(data);
      });
    });
  }
  iralink(comp1:string, comp2:string){
    this.router.navigate(['components/recursoacademico/',comp1, comp2]);
  }
}
