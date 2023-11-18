import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CantActividadesIntervaloDTO } from 'src/app/models/CantActividadesIntervaloDTO';
import { ActividadService } from 'src/app/services/actividad.service';


@Component({
  selector: 'app-reporte05',
  templateUrl: './reporte05.component.html',
  styleUrls: ['./reporte05.component.css']
})
export class Reporte05Component implements OnInit{
  reporte:CantActividadesIntervaloDTO=new CantActividadesIntervaloDTO();
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
    this.form=this.formBuilder.group({
      fechaInicioFM:['',Validators.required],
      fechaFinFM:['',Validators.required]
    })
    this.aS.getReporteRafael(this.fechaInicio,this.fechaFin).subscribe(d => {
      this.barChartLabel = d.map(item=>item.toString());
      this.barChartData = [{
        data: d.map(item=>item.valueOf()),
        label:'Actividades',
        backgroundColor: ['blue','yellow','red']
      }]
    });
  }
  aceptar():void{
    if (this.form.valid) {
      this.reporte.fechainicio=this.form.value.FechaInicioFM;
      this.reporte.fechafin=this.form.value.FechaFinFM;
      this.fechaInicio =this.fechaInicioFM.value;
      this.fechaFin=this.fechaFinFM.value;
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
  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    this.router.navigate(['components/reportes/reporterafael']);
    return control;
  }
}
