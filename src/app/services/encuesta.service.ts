import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Encuesta } from '../models/encuesta';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  private url = `${base_url}/encuestas`;
  private listaCambio = new Subject<Encuesta[]>();
  constructor(private http: HttpClient) {}

  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Encuesta[]>(this.url/*, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    }*/);
  }
  insert(de: Encuesta) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, de/*, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    }*/);
  }
  setList(listaNueva: Encuesta[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listarId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Encuesta>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  modificar(de: Encuesta) {
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

  //Devolver última encuesta creada
  ultimaencuestacreada(){
    let token = sessionStorage.getItem('token');

    return this.http.get<number>(`${this.url}/ultimaencuestacreada`/*, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    }*/);
  }
}
