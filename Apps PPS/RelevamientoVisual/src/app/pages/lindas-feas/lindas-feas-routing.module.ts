import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LindasFeasPage } from './lindas-feas.page';

const routes: Routes = [
  {
    path: '',
    component: LindasFeasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LindasFeasPageRoutingModule {}
