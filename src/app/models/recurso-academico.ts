import {TipoRecurso} from "./tiporecurso";
import {Curso} from "./curso";

export class RecursoAcademico{
  iD:number=0
  enlaceRecurso:string=""
  nombreRecurso:string=""
  autor:string=""
  descripcion:string=""
  fechaPublicacion:Date=new Date(Date.now())
  TipoRecursoDTO:TipoRecurso=new TipoRecurso
  CursoDTO:Curso=new Curso
}
