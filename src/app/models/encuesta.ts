import { Usuarios } from "./usuarios"

export class Encuesta {
    idEncuesta: number = 0
    nombreEncuesta: string = ""
    comentario: string = ""
    usuario: Usuarios = new Usuarios()
}