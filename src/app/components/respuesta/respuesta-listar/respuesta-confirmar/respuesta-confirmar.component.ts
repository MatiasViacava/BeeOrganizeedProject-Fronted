import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RespuestaService } from 'src/app/services/respuesta.service';

@Component({
  selector: 'app-respuesta-confirmar',
  templateUrl: './respuesta-confirmar.component.html',
  styleUrls: ['./respuesta-confirmar.component.css']
})
export class RespuestaConfirmarComponent implements OnInit{
  constructor(
    private cS: RespuestaService,
    private dialogRef: MatDialogRef<RespuestaConfirmarComponent>
  ) { }

  ngOnInit(): void { }

  confirmar(estado: boolean) {
    this.cS.setConfirmDelete(estado);
    this.dialogRef.close();
  }

}
