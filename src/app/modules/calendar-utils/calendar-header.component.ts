import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'mwl-demo-utils-calendar-header',
  template: `
    <div class="row text-center">
      <div class="col-md-4">
        <mat-button-toggle-group name="fontStyle" aria-label="Font Style">
          <mat-button-toggle value="bold"
            mwlCalendarPreviousView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)"
          >Previous</mat-button-toggle>
          <mat-button-toggle value="italic"
            mwlCalendarToday
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)"
          >Today</mat-button-toggle>
          <mat-button-toggle value="underline"
            mwlCalendarNextView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)"
          >Next</mat-button-toggle>
        </mat-button-toggle-group>
      </div>
      <div class="col-md-4">
        <h3>{{ viewDate | calendarDate: view + 'ViewTitle':locale }}</h3>
      </div>
      <div class="col-md-4">
        <mat-button-toggle-group name="fontStyle" aria-label="Font Style">
          <mat-button-toggle value="bold"
            (click)="viewChange.emit('month')"
            [class.active]="view === 'month'"
          >Month</mat-button-toggle>
          <mat-button-toggle value="italic"
            (click)="viewChange.emit('week')"
            [class.active]="view === 'week'"
          >Week</mat-button-toggle>
          <mat-button-toggle value="underline"
            (click)="viewChange.emit('day')"
            [class.active]="view === 'day'"
          >Day</mat-button-toggle>
        </mat-button-toggle-group>
      </div>
    </div>
    <br />
  `,
})
export class CalendarHeaderComponent {
  @Input() view: CalendarView | 'month' | 'week' | 'day';

  @Input() viewDate: Date;

  @Input() locale: string = 'en';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
}
