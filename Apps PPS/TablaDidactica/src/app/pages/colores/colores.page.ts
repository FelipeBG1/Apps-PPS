import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-colores',
  templateUrl: './colores.page.html',
  styleUrls: ['./colores.page.scss'],
})
export class ColoresPage implements OnInit {

  @Output() datoEvent = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit() {
  }

  reproducirSonido(animal : string)
  {
    this.datoEvent.emit(animal);
  }

}
