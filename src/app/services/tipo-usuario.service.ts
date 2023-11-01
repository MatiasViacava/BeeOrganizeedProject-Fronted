import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TipoUsuario } from '../models/tipousuario';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {
  private url = `${base_url}/tiposusuarios`;
  private listaCambio = new Subject<TipoUsuario[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<TipoUsuario[]>(this.url);
  }
  insert(de: TipoUsuario) {
    return this.http.post(this.url, de);
  }
  setList(listaNueva: TipoUsuario[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listarId(id: number) {
    return this.http.get<TipoUsuario>(`${this.url}/${id}`);
  }
  modificar(de: TipoUsuario) {
    return this.http.put(this.url, de);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
