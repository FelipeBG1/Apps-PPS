import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

import {MatSlideToggleModule,MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS} from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    MatSlideToggleModule
  ],
  declarations: [LoginPage],
  providers: [{
    provide: MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS,
    useValue: { color: 'accent' },
}]
})
export class LoginPageModule {}
