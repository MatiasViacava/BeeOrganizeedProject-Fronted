import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { TipoActividadService } from 'src/app/services/tipo-actividad.service';

@Component({
  selector: 'app-reporte04',
  templateUrl: './reporte04.component.html',
  styleUrls: ['./reporte04.component.css']
})
export class Reporte04Component implements OnInit{
  barChartOptions:ChartOptions={ responsive:true, }
  barChartLabel:string[] = [];
  barChartType:ChartType = 'pie'
  barChartLegend=true;
  barChartData:ChartDataset[] = [];
  
  constructor(private taS:TipoActividadService){}

  ngOnInit(): void{
    this.taS.getReporteJuan().subscribe(data => {
      this.barChartLabel = data.map(item => item.nombreUsuario);
      this.barChartData = [{
        data: data.map(item => item.cantTipoactividadPorUsuarioDTO),
        label:'Actividad',
        backgroundColor: ['#A5FFA5','#A5A5FF','#00A5FF','#FFA5FF']
      }]
    });
  }

}
