import { Idioma } from "./idioma"
import { Usuarios } from "./usuarios"

export class Configuracion{
    idConfiguracion:number=0
    colorInterfaz:string=""
    idioma: Idioma = new Idioma
    usuario: Usuarios = new Usuarios
}