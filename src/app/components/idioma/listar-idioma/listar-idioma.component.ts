import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Idioma } from 'src/app/models/idioma';
import { IdiomaService } from 'src/app/services/idioma.service';

@Component({
  selector: 'app-listar-idioma',
  templateUrl: './listar-idioma.component.html',
  styleUrls: ['./listar-idioma.component.css']
})
export class ListarIdiomaComponent implements OnInit {
  dataSource: MatTableDataSource<Idioma> = new MatTableDataSource();
  displayedColumns: string[] =
  ['idIdioma', 'nombreIdioma', 'actualizar','eliminar']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private iS: IdiomaService) {}

  ngOnInit(): void {
    this.iS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.iS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    }); 
  }
  eliminar(idIdioma: number){
    this.iS.eliminar(idIdioma).subscribe(() => {
      this.iS.list().subscribe(data => {
        this.iS.setList(data);
      });
    });
  }

}
