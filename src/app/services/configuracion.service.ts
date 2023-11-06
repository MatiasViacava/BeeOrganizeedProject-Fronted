import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Configuracion } from '../models/configuracion';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  private url = `${base_url}/configuraciones`;
  private listaCambio = new Subject<Configuracion[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Configuracion[]>(this.url);
  }
  insert(de: Configuracion) {
    return this.http.post(this.url, de);
  }
  setList(listaNueva: Configuracion[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listarId(id: number) {
    return this.http.get<Configuracion>(`${this.url}/${id}`);
  }
  modificar(de: Configuracion) {
    return this.http.put(this.url, de);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
