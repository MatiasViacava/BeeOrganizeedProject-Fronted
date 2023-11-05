import { Usuarios } from "./usuarios"

export class Encuesta {
    idEncuesta: number = 0
    valoracionFinal: number = 0
    comentario: string = ""
    usuario: Usuarios = new Usuarios()
}