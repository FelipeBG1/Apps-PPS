import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-animales',
  templateUrl: './animales.page.html',
  styleUrls: ['./animales.page.scss'],
})
export class AnimalesPage implements OnInit {

  @Output() datoEvent = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit() {
  }

  reproducirSonido(animal : string)
  {
    this.datoEvent.emit(animal);
  }


}
