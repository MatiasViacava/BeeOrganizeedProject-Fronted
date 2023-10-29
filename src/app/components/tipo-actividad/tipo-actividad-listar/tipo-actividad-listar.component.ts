import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TipoActividad } from 'src/app/models/tipoactividad';
import { TipoActividadService } from 'src/app/services/tipo-actividad.service';

@Component({
  selector: 'app-tipo-actividad-listar',
  templateUrl: './tipo-actividad-listar.component.html',
  styleUrls: ['./tipo-actividad-listar.component.css']
})
export class TipoActividadListarComponent implements OnInit {
  dataSource: MatTableDataSource<TipoActividad> = new MatTableDataSource();
  displayedColumns: string[] =
  ['codigo', 'nombre', 'actualizar','eliminar']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private taS: TipoActividadService) {}

  ngOnInit(): void {
    this.taS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.taS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    }); 
  }
  eliminar(idTipoAcitvidad: number){
    this.taS.eliminar(idTipoAcitvidad).subscribe(() => {
      this.taS.list().subscribe(data => {
        this.taS.setList(data);
      });
    });
  }
}
