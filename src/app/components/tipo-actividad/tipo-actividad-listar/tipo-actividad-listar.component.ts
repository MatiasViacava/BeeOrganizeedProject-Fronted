import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TipoActividad } from 'src/app/models/tipoactividad';
import { TipoActividadService } from 'src/app/services/tipo-actividad.service';

import { MatDialog } from '@angular/material/dialog'; //NUEVO
import { TipoActividadConfirmarComponent } from './tipo-actividad-confirmar/tipo-actividad-confirmar.component';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(
    public route: ActivatedRoute, 
    private router: Router, 
    private taS: TipoActividadService,
    private dialog: MatDialog //ELIMINAR - NUEVO
  ) {}

  //ELIMINAR - NUEVO
  idSeleccionado: number = 0;

  ngOnInit(): void {
    this.taS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.taS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    
    //ELIMINAR - NUEVO
    this.taS.getConfirmDelete().subscribe(data => {
      data == true ? this.eliminar(this.idSeleccionado) : false;
      this.ngOnInit()
    }); 
  }


  eliminar(idTipoAcitvidad: number){
    this.taS.eliminar(idTipoAcitvidad).subscribe(() => {
      this.taS.list().subscribe(data => {
        this.taS.setList(data);
      });
    });
  }
  iralink(comp1:string, comp2:string){
    this.router.navigate(['components/tipoactividad/',comp1, comp2]);
  }

  //ELIMINAR - NUEVO
  confirmar(id: number) {
    this.idSeleccionado = id;
    this.dialog.open(TipoActividadConfirmarComponent);
  }

}
