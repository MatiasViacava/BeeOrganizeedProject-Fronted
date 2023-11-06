import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TipoUsuario } from 'src/app/models/tipousuario';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';

@Component({
  selector: 'app-tipousuario-listar',
  templateUrl: './tipousuario-listar.component.html',
  styleUrls: ['./tipousuario-listar.component.css']
})
export class TipousuarioListarComponent {
  dataSource: MatTableDataSource<TipoUsuario> = new MatTableDataSource();
  displayedColumns: string[] =
  ['codigo', 'nombre','usuario_id','actualizar','eliminar']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private tuS: TipoUsuarioService) {}

  ngOnInit(): void {
    this.tuS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.tuS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    }); 
  }
  eliminar(idTipoUsuario: number){
    this.tuS.eliminar(idTipoUsuario).subscribe(() => {
      this.tuS.list().subscribe(data => {
        this.tuS.setList(data);
      });
    });
  }
}
