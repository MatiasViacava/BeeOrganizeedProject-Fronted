import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/models/curso';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-cursos-listar',
  templateUrl: './cursos-listar.component.html',
  styleUrls: ['./cursos-listar.component.css']
})
export class CursosListarComponent implements OnInit{
  dataSource: MatTableDataSource<Curso> = new MatTableDataSource();
  displayedColumns: string[] =
  ['codigo', 'nombre', 'descripcion', 'fechainicio', 'fechafin', 'actualizar','eliminar']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cS: CursosService) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    }); 
  }
  eliminar(idTipoAcitvidad: number){
    this.cS.eliminar(idTipoAcitvidad).subscribe(() => {
      this.cS.list().subscribe(data => {
        this.cS.setList(data);
      });
    });
  }
}