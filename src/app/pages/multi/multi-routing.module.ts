import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultiPage } from './multi.page';

const routes: Routes = [
  {
    path: '',
    component: MultiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultiPageRoutingModule {}
