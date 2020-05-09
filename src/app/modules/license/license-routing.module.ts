import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListLicensesComponent } from './components/list-licenses/list-licenses.component';

const routes: Routes = [
  {
    path: ':id',
    component: ListLicensesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicenseRoutingModule {}
