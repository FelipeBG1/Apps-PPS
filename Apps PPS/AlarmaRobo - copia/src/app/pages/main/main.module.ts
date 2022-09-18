import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatInputModule,MAT_INPUT_VALUE_ACCESSOR} from '@angular/material/input';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    MatInputModule,
    ReactiveFormsModule

  ],
  declarations: [MainPage],
  providers: [{
    provide: MAT_INPUT_VALUE_ACCESSOR,
    useValue: { color: 'accent' },
}]
})
export class MainPageModule {}
