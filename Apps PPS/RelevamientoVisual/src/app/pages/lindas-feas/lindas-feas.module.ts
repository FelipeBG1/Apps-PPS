import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LindasFeasPageRoutingModule } from './lindas-feas-routing.module';

import { LindasFeasPage } from './lindas-feas.page';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LindasFeasPageRoutingModule,
    MatCardModule,
  ],
  declarations: [LindasFeasPage],
})
export class LindasFeasPageModule {}
