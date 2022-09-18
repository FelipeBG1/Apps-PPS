import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';

import { AnimalesPage } from '../animales/animales.page';
import { NumerosPage } from '../numeros/numeros.page';
import { ColoresPage } from '../colores/colores.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
  ],
  declarations: [MainPage,AnimalesPage,NumerosPage,ColoresPage]
})
export class MainPageModule {}
