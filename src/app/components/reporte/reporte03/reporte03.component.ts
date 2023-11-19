import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ActividadService } from 'src/app/services/actividad.service';

@Component({
  selector: 'app-reporte03',
  templateUrl: './reporte03.component.html',
  styleUrls: ['./reporte03.component.css']
})
export class Reporte03Component implements OnInit{
  barChartOptions:ChartOptions={ responsive:true, }
  barChartLabel:string[] = [];
  barChartType:ChartType = 'line'
  barChartLegend=true;
  barChartData:ChartDataset[] = [];
  
  constructor(private aS:ActividadService){}

  ngOnInit(): void{
    this.aS.getReporteSebastian().subscribe(data => {
      this.barChartLabel = data.map(item => item.dateActivity.toString());
      this.barChartData = [{
        data: data.map(item => item.maxActivity),
        label:'Actividades',
        backgroundColor: ['#99c7c2','#c79999','#bd99c7']
      }]
    });
  }

}
