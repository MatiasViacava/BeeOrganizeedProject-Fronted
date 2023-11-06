import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipo-usuario.component.html',
  styleUrls: ['./tipo-usuario.component.css']
})
export class TipoUsuarioComponent {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
