import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuarios } from '../models/usuarios';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = `${base_url}/usuarios`;
  private ListaCambio = new Subject<Usuarios[]>();
  constructor(private smvohttp: HttpClient) {}
  list() {
    return this.smvohttp.get<Usuarios[]>(this.url);
  }
  insert(smvoIn: Usuarios) {
    return this.smvohttp.post(this.url, smvoIn);
  }
  setList(ListaNueva: Usuarios[]) {
    this.ListaCambio.next(ListaNueva);
  }
  getList() {
    return this.ListaCambio.asObservable();
  }
  listarId(id: number) {
    return this.smvohttp.get<Usuarios>(`${this.url}/${id}`);
  }
  eliminar(id: number) {
    return this.smvohttp.delete(`${this.url}/${id}`);
  }
  modificar(de: Usuarios) {
    return this.smvohttp.put(this.url, de);
  }
}
