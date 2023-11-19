import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActividadService } from 'src/app/services/actividad.service';

@Component({
  selector: 'app-actividad-confirmar',
  templateUrl: './actividad-confirmar.component.html',
  styleUrls: ['./actividad-confirmar.component.css']
})
export class ActividadConfirmarComponent implements OnInit{
  constructor(
    private aS: ActividadService,
    private dialogRef: MatDialogRef<ActividadConfirmarComponent>
  ) { }

  ngOnInit(): void { }

  confirmar(estado: boolean) {
    this.aS.setConfirmDelete(estado);
    this.dialogRef.close();
  }
}
