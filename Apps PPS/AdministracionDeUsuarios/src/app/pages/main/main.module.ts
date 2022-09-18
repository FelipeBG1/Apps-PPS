import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { AgregarUsuarioPage } from '../agregar-usuario/agregar-usuario.page';
import { ListadoUsuariosPage } from '../listado-usuarios/listado-usuarios.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule, 
    ReactiveFormsModule  
  ],
  declarations: [MainPage,AgregarUsuarioPage,ListadoUsuariosPage]
})
export class MainPageModule {}
