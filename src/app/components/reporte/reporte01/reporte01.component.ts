import { Component, OnInit } from '@angular/core';
import { ChartDataset } from 'chart.js';
import { ChartType } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { TipoRecursoService } from 'src/app/services/tipo-recurso.service';

@Component({
  selector: 'app-reporte01',
  templateUrl: './reporte01.component.html',
  styleUrls: ['./reporte01.component.css']
})
export class Reporte01Component implements OnInit{
  barChartOptions:ChartOptions={ responsive:true, }
  barChartLabel:string[] = [];
  barChartType:ChartType = 'pie'
  barChartLegend=true;
  barChartData:ChartDataset[] = [];
  
  constructor(private iS:TipoRecursoService){}

  ngOnInit(): void{
    this.iS.getReporteJulio().subscribe(data => {
      this.barChartLabel = data.map(item => item.nombreTipoRecurso);
      this.barChartData = [{
        data: data.map(item => item.cantRecursos),
        label:'Recursos académicos',
        backgroundColor: ['#E07A5F','#F4F1DE','red']
      }]
    });
  }

}
