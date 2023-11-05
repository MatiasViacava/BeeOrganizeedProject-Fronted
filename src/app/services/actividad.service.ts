import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Actividad } from '../models/actividad';
import { HttpClient } from '@angular/common/http';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  private url = `${base_url}/actividades`;
  private listaCambio = new Subject<Actividad[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Actividad[]>(this.url);
  }
  insert(de: Actividad) {
    return this.http.post(this.url, de);
  }
  setList(listaNueva: Actividad[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listarId(id: number) {
    return this.http.get<Actividad>(`${this.url}/${id}`);
  }
  modificar(de: Actividad) {
    return this.http.put(this.url, de);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
