import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CantActividadesIntervaloDTO } from 'src/app/models/CantActividadesIntervaloDTO';
import { ActividadService } from 'src/app/services/actividad.service';
import * as moment from 'moment'

@Component({
  selector: 'app-reporte05',
  templateUrl: './reporte05.component.html',
  styleUrls: ['./reporte05.component.css']
})
export class Reporte05Component implements OnInit{
  intervalo:CantActividadesIntervaloDTO={fechainicio:new Date(),fechafin:new Date()};
  resultado:number=0;
  barChartOptions:ChartOptions={ responsive:true, }
  barChartLabel:string[] = [];
  barChartType:ChartType = 'bar'
  barChartLegend=true;
  barChartData:ChartDataset[] = [];
  minFecha: Date = moment().add('days').toDate();
  minFechaFin: Date = moment().add('days').toDate();
  constructor(private aS:ActividadService){}
  ngOnInit(): void {
    this.aS.getReporteRafael(this.intervalo).subscribe(data=>{
      this.resultado=data;
      this.actualizar();
    })
  }
  ejecutar():void{
    this.aS.getReporteRafael(this.intervalo).subscribe(data=>{
      this.setresultado(data);
      this.actualizar();
    })

  }
  private actualizar():void{
    this.barChartLabel=[this.intervalo.fechainicio.toDateString()+'-'+this.intervalo.fechafin.toDateString()]
    this.barChartData=[{
      data:[this.resultado],
      label:'Actividades',
      backgroundColor:['#00A5A5','#FFA5A5'],
      barThickness:150
      
    }]
  }
  actualizafechainicio(event:any):void{
    this.intervalo.fechainicio=event.value;
    let fechaInicio = new Date(event.value);
    fechaInicio.setDate(fechaInicio.getDate() + 1);
    this.minFechaFin = fechaInicio;
  }
  actualizafechafin(event:any):void{
    this.intervalo.fechafin=event.value;
  }
  setresultado(res:number)
  {
    this.resultado=res;
  }
}
