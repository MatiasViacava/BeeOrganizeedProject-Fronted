import { Curso } from "./curso"
import { Horario } from "./horario"
import { TipoActividad } from "./tipoactividad"

export class Actividad{
    idActividad:number=0
    nombreActividad:string=""
    descripcion:string=""
    estado:string=""
    calificacion:string=""
    fecha:Date=new Date(Date.now())
    horario:Horario = new Horario()
    tipoActividad:TipoActividad = new TipoActividad()
    curso:Curso = new Curso()
}