import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoUsuariosPageRoutingModule } from './listado-usuarios-routing.module';

import { ListadoUsuariosPage } from './listado-usuarios.page';
import { AgregarUsuarioPage } from '../agregar-usuario/agregar-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoUsuariosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ListadoUsuariosPage,AgregarUsuarioPage]
})
export class ListadoUsuariosPageModule {}
