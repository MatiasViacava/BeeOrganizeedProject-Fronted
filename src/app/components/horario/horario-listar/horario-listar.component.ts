import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Horario } from 'src/app/models/horario';
import { HorarioService } from 'src/app/services/horario.service';

@Component({
  selector: 'app-horario-listar',
  templateUrl: './horario-listar.component.html',
  styleUrls: ['./horario-listar.component.css']
})
export class HorarioListarComponent implements OnInit{
  dataSource: MatTableDataSource<Horario> = new MatTableDataSource();
  displayedColumns: string[] =
  ['idHorario', 'cierreCiclo', 'usuario', 'actualizar','eliminar']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private hS: HorarioService) {}

  ngOnInit(): void {
    this.hS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.hS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    }); 
  }
  eliminar(idHorario: number){
    this.hS.eliminar(idHorario).subscribe(() => {
      this.hS.list().subscribe(data => {
        this.hS.setList(data);
      });
    });
  }
}
