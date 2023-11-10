import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Configuracion } from '../models/configuracion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  private url = `${base_url}/configuraciones`;
  private listaCambio = new Subject<Configuracion[]>();
  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Configuracion[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(de: Configuracion) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, de, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva: Configuracion[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listarId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Configuracion>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  modificar(de: Configuracion) {
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

    return this.http.get<Configuracion[]>(`${this.url}/listar/${idusuario}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
