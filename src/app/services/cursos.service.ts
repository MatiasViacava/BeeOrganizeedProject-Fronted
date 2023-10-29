import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Curso } from '../models/curso';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


const base_url=environment.base

@Injectable({
  providedIn: 'root'
})

export class CursosService {
  private url = `${base_url}/cursos`;
  private listaCambio = new Subject<Curso[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Curso[]>(this.url);
  }
  insert(de: Curso) {
    return this.http.post(this.url, de);
  }
  setList(listaNueva: Curso[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listarId(id: number) {
    return this.http.get<Curso>(`${this.url}/${id}`);
  }
  modificar(de: Curso) {
    return this.http.put(this.url, de);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
