import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import {MatTabsModule,MAT_TAB} from '@angular/material/tabs';
import { LindasFeasPage } from '../lindas-feas/lindas-feas.page';
import { MatCardModule } from '@angular/material/card';
import { PerfilPage } from '../perfil/perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    MatTabsModule,
    MatCardModule
  ],
  declarations: [MainPage,LindasFeasPage,PerfilPage],
  providers: [{
    provide: MAT_TAB,
    useValue: { color: 'accent' },
}]
})
export class MainPageModule {}
