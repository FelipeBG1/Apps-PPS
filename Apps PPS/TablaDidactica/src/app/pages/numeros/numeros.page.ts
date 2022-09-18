import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-numeros',
  templateUrl: './numeros.page.html',
  styleUrls: ['./numeros.page.scss'],
})
export class NumerosPage implements OnInit {

  @Output() datoEvent = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit() {
  }

  reproducirSonido(animal : string)
  {
    this.datoEvent.emit(animal);
  }
  

}


