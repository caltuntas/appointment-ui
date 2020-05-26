import { MatSelectModule } from '@angular/material/select';
import { DayViewSchedulerComponent } from 'src/app/modules/scheduler/day-view-scheduler.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarUtilsModule } from './../../modules/calendar-utils/module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SchedulerComponent } from 'src/app/modules/scheduler/scheduler.component';

@NgModule({
  declarations: [DefaultComponent, DashboardComponent, SchedulerComponent, DayViewSchedulerComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxSpinnerModule,
    SharedModule,
    MatSidenavModule,
    CalendarUtilsModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDatepickerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class DefaultModule {}
