import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Actividad } from '../models/actividad';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

    return this.http.get<Actividad[]>(`${this.url}/${idusuario}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
