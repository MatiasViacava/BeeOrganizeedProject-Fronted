import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Encuesta } from '../models/encuesta';
import { HttpClient } from '@angular/common/http';


const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  private url = `${base_url}/encuestas`;
  private listaCambio = new Subject<Encuesta[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Encuesta[]>(this.url);
  }
  insert(de: Encuesta) {
    return this.http.post(this.url, de);
  }
  setList(listaNueva: Encuesta[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listarId(id: number) {
    return this.http.get<Encuesta>(`${this.url}/${id}`);
  }
  modificar(de: Encuesta) {
    return this.http.put(this.url, de);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
