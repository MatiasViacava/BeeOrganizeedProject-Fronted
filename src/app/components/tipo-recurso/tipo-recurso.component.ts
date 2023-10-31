import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipo-recurso',
  templateUrl: './tipo-recurso.component.html',
  styleUrls: ['./tipo-recurso.component.css']
})
export class TipoRecursoComponent {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
