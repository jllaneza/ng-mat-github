import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { ReadmeComponent } from './readme/readme.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'readme/:username/:repo',
    component: ReadmeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReposRoutingModule { }
