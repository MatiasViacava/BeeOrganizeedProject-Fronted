import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoRecurso } from '../models/tiporecurso';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TipoRecursoService {
  private url = `${base_url}/tiposrecursos`;
  private listaCambio = new Subject<TipoRecurso[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<TipoRecurso[]>(this.url);
  }
  insert(de: TipoRecurso) {
    return this.http.post(this.url, de);
  }
  setList(listaNueva: TipoRecurso[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listarId(id: number) {
    return this.http.get<TipoRecurso>(`${this.url}/${id}`);
  }
  modificar(de: TipoRecurso) {
    return this.http.put(this.url, de);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
