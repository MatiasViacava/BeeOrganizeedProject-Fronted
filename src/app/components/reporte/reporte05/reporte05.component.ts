import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ActividadService } from 'src/app/services/actividad.service';


@Component({
  selector: 'app-reporte05',
  templateUrl: './reporte05.component.html',
  styleUrls: ['./reporte05.component.css']
})
export class Reporte05Component implements OnInit{
  form: FormGroup = new FormGroup({});
  barChartOptions:ChartOptions={ responsive:true, }
  barChartLabel:string[] = [];
  barChartType:ChartType = 'pie'
  barChartLegend=true;
  barChartData:ChartDataset[] = [];
  fechaInicioFM = new FormControl(new Date());
  fechaFinFM = new FormControl(new Date());
  fechaInicio =this.fechaInicioFM.value;
  fechaFin=this.fechaFinFM.value;
  constructor(private aS:ActividadService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute){}
  ngOnInit(): void{
    this.aS.getReporteRafael(this.fechaInicio,this.fechaFin).subscribe(d => {
      this.barChartLabel = d.map(item=>item.toString());
      this.barChartData = [{
        data: d.map(item=>item.valueOf()),
        label:'Actividades',
        backgroundColor: ['blue','yellow','red']
      }]
    });
  }
}
