import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TipoRecurso } from 'src/app/models/tiporecurso';
import { TipoRecursoService } from 'src/app/services/tipo-recurso.service';

@Component({
  selector: 'app-tipo-recurso-listar',
  templateUrl: './tipo-recurso-listar.component.html',
  styleUrls: ['./tipo-recurso-listar.component.css']
})
export class TipoRecursoListarComponent {
  dataSource: MatTableDataSource<TipoRecurso> = new MatTableDataSource();
  displayedColumns: string[] =
  ['codigo', 'nombre', 'actualizar','eliminar']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private trS: TipoRecursoService) {}

  ngOnInit(): void {
    this.trS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.trS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    }); 
  }
  eliminar(idTipoAcitvidad: number){
    this.trS.eliminar(idTipoAcitvidad).subscribe(() => {
      this.trS.list().subscribe(data => {
        this.trS.setList(data);
      });
    });
  }
}
