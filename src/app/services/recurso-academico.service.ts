import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable, Subject} from "rxjs";
import {RecursoAcademico} from "../models/recurso-academico";
import {HttpClient} from "@angular/common/http";


const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class RecursoAcademicoService {
  private url =`${base_url}/recursosacademicos`
  private listaCambio=new Subject<RecursoAcademico[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<RecursoAcademico[]>(this.url)
  }
  insert(ra:RecursoAcademico){
    return this.http.post(this.url,ra)
  }
  setlist(listanueva:RecursoAcademico[]){
    this.listaCambio.next(listanueva)
  }
  getlist(){
    return this.listaCambio.asObservable()
  }
  listarid(id:number){
    return this.http.get<RecursoAcademico>(`${this.url}/${id}`)
  }
  modificar(ra:RecursoAcademico){
    return this.http.put(this.url,ra)
  }
  eliminar(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  //BUSCAR POR FECHA
  buscar(fecha: string): Observable<RecursoAcademico[]> {
    return this.http.post<RecursoAcademico[]>(`${this.url}/buscar`, { fecha: fecha });
  }
}
