import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Encuesta } from 'src/app/models/encuesta';
import { EncuestaService } from 'src/app/services/encuesta.service';

@Component({
  selector: 'app-encuesta-listar',
  templateUrl: './encuesta-listar.component.html',
  styleUrls: ['./encuesta-listar.component.css']
})
export class EncuestaListarComponent implements OnInit{
  dataSource: MatTableDataSource<Encuesta> = new MatTableDataSource();
  displayedColumns: string[] =
  ['codigo', 'valoracionfinal', 'comentario', 'usuario_id', 'actualizar','eliminar']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    public route: ActivatedRoute, 
    private router: Router, 
    private eS: EncuestaService) {}

  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.eS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    }); 
  }
  eliminar(idEncuesta: number){
    this.eS.eliminar(idEncuesta).subscribe(() => {
      this.eS.list().subscribe(data => {
        this.eS.setList(data);
      });
    });
  }
  iralink(comp1:string, comp2:string){
    this.router.navigate(['/components/encuestas/',comp1, comp2]);
  }
}
