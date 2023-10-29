import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pregunta } from '../models/pregunta';
import { HttpClient } from '@angular/common/http';


const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  private url = `${base_url}/preguntas`;
  private listaCambio = new Subject<Pregunta[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Pregunta[]>(this.url);
  }
  insert(de: Pregunta) {
    return this.http.post(this.url, de);
  }
  setList(listaNueva: Pregunta[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listarId(id: number) {
    return this.http.get<Pregunta>(`${this.url}/${id}`);
  }
  modificar(de: Pregunta) {
    return this.http.put(this.url, de);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
