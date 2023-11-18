import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Actividad } from '../models/actividad';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QueryActividadMAX } from '../models/QueryActividadMAX';
import { CantActividadesIntervaloDTO } from '../models/CantActividadesIntervaloDTO';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  private url = `${base_url}/actividades`;
  private listaCambio = new Subject<Actividad[]>();
  constructor(private http: HttpClient) {}

  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Actividad[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(de: Actividad) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, de, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    } );
  }
  setList(listaNueva: Actividad[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  
  listarId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Actividad>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  modificar(de: Actividad) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, de, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  eliminar(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  listporusuarioid(idusuario: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Actividad[]>(`${this.url}/listar/${idusuario}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  //REPORTE SEBASTIAN
  getReporteSebastian(){
    let token = sessionStorage.getItem('token');

    return this.http.get<QueryActividadMAX[]>(`${this.url}/actividadesmaximas`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  //REPORTE RAFAEL

  getReporteRafael(fechaInicio:Date|null,fechaFin:Date|null){
    let token = sessionStorage.getItem('token');
    
    const body={fechainicio:fechaInicio,fechafin:fechaFin};
    return this.http.post<number[]>(`${this.url}/CantActividadesEntreIntervalos`,body,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
