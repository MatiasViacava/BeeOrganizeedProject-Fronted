import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RecursoAcademicoService } from 'src/app/services/recurso-academico.service';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent implements OnInit{
  constructor(
    private cS: RecursoAcademicoService,
    private dialogRef: MatDialogRef<ConfirmarComponent>
  ) { }

  ngOnInit(): void { }

  confirmar(estado: boolean) {
    this.cS.setConfirmDelete(estado);
    this.dialogRef.close();
  }
}
