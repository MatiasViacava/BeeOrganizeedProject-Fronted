import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TipoActividad } from '../models/tipoactividad';
import { Subject } from 'rxjs';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class TipoActividadService {
  private url = `${base_url}/tiposactividades`;
  private listaCambio = new Subject<TipoActividad[]>();
  constructor(private http: HttpClient) {}
  //ELIMINAR
  private confirmarEliminacion = new Subject<Boolean>()

  list() {
    return this.http.get<TipoActividad[]>(this.url);
  }
  insert(de: TipoActividad) {
    return this.http.post(this.url, de);
  }
  setList(listaNueva: TipoActividad[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listarId(id: number) {
    return this.http.get<TipoActividad>(`${this.url}/${id}`);
  }
  modificar(de: TipoActividad) {
    return this.http.put(this.url, de);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  //ELIMINAR
  getConfirmDelete(){
    return this.confirmarEliminacion.asObservable();
  }
  setConfirmDelete(estado:boolean){
    this.confirmarEliminacion.next(estado);
  }
}
