import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Idioma } from '../models/idioma';


const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {

  private url = `${base_url}/idiomas`;
  private listaCambio = new Subject<Idioma[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Idioma[]>(this.url);
  }
  insert(de: Idioma) {
    return this.http.post(this.url, de);
  }
  setList(listaNueva: Idioma[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listarId(id: number) {
    return this.http.get<Idioma>(`${this.url}/${id}`);
  }
  modificar(de: Idioma) {
    return this.http.put(this.url, de);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
