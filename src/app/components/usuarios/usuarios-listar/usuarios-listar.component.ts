import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios-listar',
  templateUrl: './usuarios-listar.component.html',
  styleUrls: ['./usuarios-listar.component.css']
})
export class UsuariosListarComponent {
  dataSource: MatTableDataSource<Usuarios> = new MatTableDataSource();
  displayedColumns: string[] =
  ['id','username', 'password','enabled','nombres','apellidos','fechaNacimiento','universidad','email','estado','actualizar'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private uS: UsuariosService) {}
  ngOnInit(): void {
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
}
