import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Respuesta } from '../models/respuesta';
import { HttpClient } from '@angular/common/http';


const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  private url = `${base_url}/respuestas`;
  private listaCambio = new Subject<Respuesta[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Respuesta[]>(this.url);
  }
  insert(de: Respuesta) {
    return this.http.post(this.url, de);
  }
  setList(listaNueva: Respuesta[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listarId(id: number) {
    return this.http.get<Respuesta>(`${this.url}/${id}`);
  }
  modificar(de: Respuesta) {
    return this.http.put(this.url, de);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
