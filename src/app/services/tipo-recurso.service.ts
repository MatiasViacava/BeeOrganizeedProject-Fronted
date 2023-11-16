import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoRecurso } from '../models/tiporecurso';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QueryCantRecursosPorTipoDTO } from '../models/QueryCantRecursosPorTipoDTO';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TipoRecursoService {
  private url = `${base_url}/tiposrecursos`;
  private listaCambio = new Subject<TipoRecurso[]>();
  constructor(private http: HttpClient) {}

  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<TipoRecurso[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(de: TipoRecurso) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, de, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva: TipoRecurso[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listarId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<TipoRecurso>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  modificar(de: TipoRecurso) {
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

  //REPORTE Julio
  getReporteJulio(){
    let token = sessionStorage.getItem('token');
    return this.http.get<QueryCantRecursosPorTipoDTO[]>(`${this.url}/cantidad`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
