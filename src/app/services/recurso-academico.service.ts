import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable, Subject} from "rxjs";
import {RecursoAcademico} from "../models/recurso-academico";
import {HttpClient, HttpHeaders} from "@angular/common/http";


const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class RecursoAcademicoService {
  private url =`${base_url}/recursosacademicos`
  private listaCambio=new Subject<RecursoAcademico[]>();
  constructor(private http:HttpClient) { }
  list(){
    let token = sessionStorage.getItem('token');

    return this.http.get<RecursoAcademico[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    })
  }
  insert(ra:RecursoAcademico){
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url,ra, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    })
  }
  setlist(listanueva:RecursoAcademico[]){
    this.listaCambio.next(listanueva)
  }
  getlist(){
    return this.listaCambio.asObservable()
  }
  listarid(id:number){
    let token = sessionStorage.getItem('token');

    return this.http.get<RecursoAcademico>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    })
  }
  modificar(ra:RecursoAcademico){
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url,ra, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    })
  }
  eliminar(id:number){
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    })
  }
  listporusuarioid(idusuario: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<RecursoAcademico[]>(`${this.url}/${idusuario}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  //BUSCAR POR FECHA
  buscar(fecha: string): Observable<RecursoAcademico[]> {
    let token = sessionStorage.getItem('token');

    return this.http.post<RecursoAcademico[]>(`${this.url}/buscar`, { fecha: fecha }, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
