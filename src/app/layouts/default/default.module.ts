import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [DefaultComponent, DashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxSpinnerModule,
    SharedModule,
    MatSidenavModule,
  ],
})
export class DefaultModule {}
