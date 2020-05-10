import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './calendar-header.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  imports: [CommonModule, FormsModule, CalendarModule, MatButtonToggleModule],
  declarations: [CalendarHeaderComponent],
  exports: [CalendarHeaderComponent],
})
export class CalendarUtilsModule {}
