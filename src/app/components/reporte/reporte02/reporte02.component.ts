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
  barChartType:ChartType = 'bar'
  barChartLegend=true;
  barChartData:ChartDataset[] = [];
  
  constructor(private taS:TipoActividadService){}

  ngOnInit(): void{
    this.taS.getReporteFabian().subscribe(data => {
      this.barChartLabel = data.map(item => item.tipo_Actividad);
      this.barChartData = [{
        data: data.map(item => item.cantidad),
        label:'Tipo actividad',
        backgroundColor: ['#b4c799','#99afc7','#a199c7','#c7c299','#c79e99','#9cc799'],
        barThickness:150
      }]
    });
  }
}
