import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipo-actividad',
  templateUrl: './tipo-actividad.component.html',
  styleUrls: ['./tipo-actividad.component.css']
})
export class TipoActividadComponent {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
