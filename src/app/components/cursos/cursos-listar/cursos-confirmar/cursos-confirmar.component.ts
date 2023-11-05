import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-cursos-confirmar',
  templateUrl: './cursos-confirmar.component.html',
  styleUrls: ['./cursos-confirmar.component.css']
})
export class CursosConfirmarComponent implements OnInit{
  constructor(
    private cS: CursosService,
    private dialogRef: MatDialogRef<CursosConfirmarComponent>
  ) { }

  ngOnInit(): void { }

  confirmar(estado: boolean) {
    this.cS.setConfirmDelete(estado);
    this.dialogRef.close();
  }
}
