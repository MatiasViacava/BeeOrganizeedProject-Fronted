import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Curso } from '../models/curso';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';


const base_url=environment.base

@Injectable({
  providedIn: 'root'
})

export class CursosService {
  private url = `${base_url}/cursos`;
  private listaCambio = new Subject<Curso[]>();
  constructor(private http: HttpClient) {}
  private confirmarEliminacion = new Subject<Boolean>()


  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Curso[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(de: Curso) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, de, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva: Curso[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listarId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Curso>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  modificar(de: Curso) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, de, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  eliminar(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  getConfirmDelete(){
    return this.confirmarEliminacion.asObservable();
  }
  setConfirmDelete(estado:boolean){
    this.confirmarEliminacion.next(estado);
  }
  listporusuarioid(idusuario: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Curso[]>(`${this.url}/${idusuario}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
