import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recurso-academico',
  templateUrl: './recurso-academico.component.html',
  styleUrls: ['./recurso-academico.component.css']
})
export class RecursoAcademicoComponent {
  constructor(public route:ActivatedRoute) {
  }
}
