import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/models/curso';
import { CursosService } from 'src/app/services/cursos.service';
import { CursosConfirmarComponent } from './cursos-confirmar/cursos-confirmar.component';
import { MatDialog } from '@angular/material/dialog';

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
  constructor(
    private cS: CursosService,    
    private dialog: MatDialog
    ) {}

  idSeleccionado: number = 0;

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    }); 
    this.cS.getConfirmDelete().subscribe(data => {
      data == true ? this.eliminar(this.idSeleccionado) : false;
      this.ngOnInit()
    }); 
  }
  eliminar(idTipoAcitvidad: number){
    this.cS.eliminar(idTipoAcitvidad).subscribe(() => {
      this.cS.list().subscribe(data => {
        this.cS.setList(data);
      });
    });
  }

  confirmar(id: number) {
    this.idSeleccionado = id;
    this.dialog.open(CursosConfirmarComponent);
  }
}