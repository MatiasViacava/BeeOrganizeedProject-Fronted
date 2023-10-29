import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Respuesta } from 'src/app/models/respuesta';
import { RespuestaService } from 'src/app/services/respuesta.service';

@Component({
  selector: 'app-respuesta-listar',
  templateUrl: './respuesta-listar.component.html',
  styleUrls: ['./respuesta-listar.component.css']
})
export class RespuestaListarComponent implements OnInit{

  dataSource: MatTableDataSource<Respuesta> = new MatTableDataSource();
  displayedColumns: string[] =
  ['idRespuesta', 'contenido','pregunta_Id', 'actualizar','eliminar']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private rS: RespuestaService) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    }); 
  }
  eliminar(idRespuesta: number){
    this.rS.eliminar(idRespuesta).subscribe(() => {
      this.rS.list().subscribe(data => {
        this.rS.setList(data);
      });
    });
  }
 
}
