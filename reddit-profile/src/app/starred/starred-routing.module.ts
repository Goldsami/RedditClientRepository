import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StarredPage } from './starred.page';

const routes: Routes = [
  {
    path: '',
    component: StarredPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StarredPageRoutingModule {}
