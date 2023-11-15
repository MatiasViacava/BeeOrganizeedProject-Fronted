import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { TipoActividadService } from 'src/app/services/tipo-actividad.service';
import { TipoRecursoService } from 'src/app/services/tipo-recurso.service';

@Component({
  selector: 'app-reporte02',
  templateUrl: './reporte02.component.html',
  styleUrls: ['./reporte02.component.css']
})
export class Reporte02Component implements OnInit{
  barChartOptions:ChartOptions={ responsive:true, }
  barChartLabel:string[] = [];
  barChartType:ChartType = 'pie'
  barChartLegend=true;
  barChartData:ChartDataset[] = [];
  
  constructor(private taS:TipoActividadService){}

  ngOnInit(): void{
    this.taS.getReporteFabian().subscribe(data => {
      this.barChartLabel = data.map(item => item.tipo_Actividad);
      this.barChartData = [{
        data: data.map(item => item.cantidad),
        label:'Tipo actividad',
        backgroundColor: ['blue','yellow','red']
      }]
    });
  }
}
