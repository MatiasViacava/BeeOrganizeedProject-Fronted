import { Usuarios } from "./usuarios"

export class Horario {
    idHorario: number = 0
    cierreCiclo: Date=new Date(Date.now())
    usuario: Usuarios = new Usuarios()
}