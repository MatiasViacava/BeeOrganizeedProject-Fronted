import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuarios } from '../models/usuarios';
import { EMPTY,Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = `${base_url}/usuarios`;
  private ListaCambio = new Subject<Usuarios[]>();
  constructor(private smvohttp: HttpClient) {}
  list() {
    let token = sessionStorage.getItem('token');

    return this.smvohttp.get<Usuarios[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(smvoIn: Usuarios) {
    let token = sessionStorage.getItem('token');

    return this.smvohttp.post(this.url, smvoIn, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(ListaNueva: Usuarios[]) {

    this.ListaCambio.next(ListaNueva);
  }
  getList() {

    return this.ListaCambio.asObservable();
  }
  listarId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.smvohttp.get<Usuarios>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  eliminar(id: number) {
    let token = sessionStorage.getItem('token');

    return this.smvohttp.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  modificar(de: Usuarios) {
    let token = sessionStorage.getItem('token');

    return this.smvohttp.put(this.url, de, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  //BUSCAR POR NOMBRE
  buscar(texto: string) {
    let token = sessionStorage.getItem('token');

    if (texto.length != 0) {
      return this.smvohttp.post<Usuarios[]>(`${this.url}/buscarnombre`, texto.toLowerCase(), {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      });
    }
    return EMPTY;
  }

  //Devolver último usuario creado
  ultimousuariocreado() {
      let token = sessionStorage.getItem('token');
  
        return this.smvohttp.get<number>(`${this.url}/ultimousuariocreado`, {
          headers: new HttpHeaders()
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json'),
    });
  }

  //Actualiza el usuario sin crear conflictos en la tabla de tipo usuario

  actualizarusuario(id:number,p1:string,p2:string,p3:string,p4:string,p5:string,p6:string,p7:string,p8:string){
    let token = sessionStorage.getItem('token');
  
    return this.smvohttp.get<number>(`${this.url}/actualizar/${id}/${p1}/${p2}/${p3}/${p4}/${p5}/${p6}/${p7}/${p8}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
});
  }

  
}
