import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RecursoAcademico } from 'src/app/models/recurso-academico';
import { RecursoAcademicoService } from 'src/app/services/recurso-academico.service';

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
  constructor(private raS:RecursoAcademicoService) {}

  ngOnInit(): void {
    this.raS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.raS.getlist().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    }); 
  }
  eliminar(iD: number){
    this.raS.eliminar(iD).subscribe(() => {
      this.raS.list().subscribe(data => {
        this.raS.setlist(data);
      });
    });
  }
}
