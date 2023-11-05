import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TipoActividadService } from 'src/app/services/tipo-actividad.service';

@Component({
  selector: 'app-tipo-actividad-confirmar',
  templateUrl: './tipo-actividad-confirmar.component.html',
  styleUrls: ['./tipo-actividad-confirmar.component.css']
})
export class TipoActividadConfirmarComponent implements OnInit{
  constructor(
    private taS: TipoActividadService,
    private dialogRef: MatDialogRef<TipoActividadConfirmarComponent>
  ) { }

  ngOnInit(): void { }

  confirmar(estado: boolean) {
    this.taS.setConfirmDelete(estado);
    this.dialogRef.close();
  }

}
