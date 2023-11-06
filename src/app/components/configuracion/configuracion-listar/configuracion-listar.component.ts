import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Configuracion } from 'src/app/models/configuracion';
import { ConfiguracionService } from 'src/app/services/configuracion.service';

@Component({
  selector: 'app-configuracion-listar',
  templateUrl: './configuracion-listar.component.html',
  styleUrls: ['./configuracion-listar.component.css']
})
export class ConfiguracionListarComponent {
  dataSource: MatTableDataSource<Configuracion> = new MatTableDataSource();
  displayedColumns: string[] =
  ['codigo', 'color','idioma_id','usuario_id','actualizar','eliminar']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private tuS: ConfiguracionService) {}

  ngOnInit(): void {
    this.tuS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.tuS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    }); 
  }
  eliminar(idConfiguracion: number){
    this.tuS.eliminar(idConfiguracion).subscribe(() => {
      this.tuS.list().subscribe(data => {
        this.tuS.setList(data);
      });
    });
  }
}
