import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuarios } from 'src/app/models/usuarios';
import { LoginService } from 'src/app/services/login.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios-listar',
  templateUrl: './usuarios-listar.component.html',
  styleUrls: ['./usuarios-listar.component.css']
})
export class UsuariosListarComponent {
  dataSource: MatTableDataSource<Usuarios> = new MatTableDataSource();
  displayedColumns: string[] =
  ['id','username', 'password','enabled','nombres','apellidos','fechaNacimiento','universidad','email','actualizar','eliminar'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    public route: ActivatedRoute, 
    private router: Router, 
    private uS: UsuariosService,
    private ls: LoginService
  ) {}

  role:string=""; //NUEVO

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);


    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    }); 
  }

  eliminar(idUsuario: number){
    this.uS.eliminar(idUsuario).subscribe(() => {
      this.uS.list().subscribe(data => {
        this.uS.setList(data);
      });
    });
  }
  iralink(comp1:string, comp2:string){
    this.router.navigate(['components/usuarios/',comp1, comp2]);
  }

  //BUSCAR POR NOMBRE
  buscarNombre(e: any) {
    let array: Usuarios[] = [];
    this.uS.list().subscribe(data => {
      data.forEach((element, index) => {
        if (element.nombres.includes(e.target.value)) {
          array.push(data[index]);
        }
      });
      this.uS.setList(array);
    })
  }
}
