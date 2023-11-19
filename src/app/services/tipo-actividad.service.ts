import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TipoActividad } from '../models/tipoactividad';
import { Subject } from 'rxjs';
import { CantTipoActividadDTO } from '../models/CantTipoActividadDTO';
import { QueryCantTipoactividadPorUsuarioDTO } from '../models/QueryCantTipoactividadDTO';


const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class TipoActividadService {
  private url = `${base_url}/tiposactividades`;
  private listaCambio = new Subject<TipoActividad[]>();
  constructor(private http: HttpClient) {}
  //ELIMINAR
  private confirmarEliminacion = new Subject<Boolean>()

  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<TipoActividad[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(de: TipoActividad) {
    let token = sessionStorage.getItem('token');

    return this.http.post(`${this.url}`, de, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva: TipoActividad[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listarId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<TipoActividad>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  modificar(de: TipoActividad) {
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

  //ELIMINAR
  getConfirmDelete(){
    return this.confirmarEliminacion.asObservable();
  }
  setConfirmDelete(estado:boolean){
    this.confirmarEliminacion.next(estado);
  }

  //REPORTE FABIAN
  getReporteFabian(){
    let token = sessionStorage.getItem('token');
    
    return this.http.get<CantTipoActividadDTO[]>(`${this.url}/cantidades`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  //REPORTE JUAN
  getReporteJuan(){
    let token = sessionStorage.getItem('token');
    
    return this.http.get<QueryCantTipoactividadPorUsuarioDTO[]>(`${this.url}/cantidadesporusuario`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
