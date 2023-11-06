import { Horario } from './../models/horario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private url = `${base_url}/horarios`;
  private listaCambio = new Subject<Horario[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Horario[]>(this.url);
  }
  insert(de: Horario) {
    return this.http.post(this.url, de);
  }
  setList(listaNueva: Horario[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listarId(id: number) {
    return this.http.get<Horario>(`${this.url}/${id}`);
  }
  modificar(de: Horario) {
    return this.http.put(this.url, de);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
