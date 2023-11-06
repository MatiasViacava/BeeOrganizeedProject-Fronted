import {TipoRecurso} from "./tiporecurso";
import {Curso} from "./curso";

export class RecursoAcademico{
  iD:number=0
  enlaceRecurso:string=""
  nombreRecurso:string=""
  autor:string=""
  descripcion:string=""
  fechaPublicacion:Date=new Date(Date.now())
  tipoRecurso_ID:TipoRecurso=new TipoRecurso
  curso_IdCurso:Curso=new Curso
}
