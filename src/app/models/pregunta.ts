import { Encuesta } from "./encuesta"

export class Pregunta{
    idPregunta:number=0
    enunciado:string=""
    encuesta_id:Encuesta=new Encuesta
}