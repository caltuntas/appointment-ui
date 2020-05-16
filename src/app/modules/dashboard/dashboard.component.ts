import { DialogBoxComponent } from 'src/app/shared/components/dialog-box/dialog-box.component';
import { AppointmentService } from 'src/app/services/appointment.service';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  Injectable,
  ViewEncapsulation,
} from '@angular/core';
import { setHours, setMinutes } from 'date-fns';
import { fromEvent } from 'rxjs';
import { WeekViewHourSegment } from 'calendar-utils';
import { addDays, addMinutes, endOfWeek } from 'date-fns';
import { finalize, takeUntil } from 'rxjs/operators';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarEventTitleFormatter,
  CalendarView,
} from 'angular-calendar';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from '../company/interfaces/company.interfaces';

function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}

function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
  refreshEvent: Subject<any> = new Subject();
  dragToCreateActive = false;
  weekStartsOn: 0 = 0;

  constructor(
    private appointmentService: AppointmentService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  private loadAppointments() {
    this.events = [];
    this.appointmentService.getAppointments().subscribe((results) => {
      results.forEach(result => {
        const startDate = new Date(result.date);
        const endDate = new Date(result.date);
        const [startHours, startMinutes] = result.startTime.split(':');
        const [endHours, endMinutes] = result.endTime.split(':');
        startDate.setHours(startHours);
        startDate.setMinutes(startMinutes);
        endDate.setHours(endHours);
        endDate.setMinutes(endMinutes);
        const e = {
          title: result.name,
          start: startDate,
          end: endDate,
        } as CalendarEvent;
        this.events.push(e);
      });
      this.refreshEvent.next();
    });
    console.log(this.events);
  }

  startDragToCreate(
    segment: WeekViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement
  ) {
    const dragToSelectEvent: CalendarEvent = {
      id: this.events.length,
      title: 'New event',
      start: segment.date,
      meta: {
        tmpEvent: true,
      },
    };
    this.events = [...this.events, dragToSelectEvent];
    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;
    const endOfView = endOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn,
    });

    fromEvent(document, 'mousemove')
      .pipe(
        finalize(() => {
          delete dragToSelectEvent.meta.tmpEvent;
          this.dragToCreateActive = false;
          this.refresh();
        }),
        takeUntil(fromEvent(document, 'mouseup'))
      )
      .subscribe((mouseMoveEvent: MouseEvent) => {
        const minutesDiff = ceilToNearest(
          mouseMoveEvent.clientY - segmentPosition.top,
          30
        );

        const daysDiff =
          floorToNearest(
            mouseMoveEvent.clientX - segmentPosition.left,
            segmentPosition.width
          ) / segmentPosition.width;

        const newEnd = addDays(addMinutes(segment.date, minutesDiff), daysDiff);
        if (newEnd > segment.date && newEnd < endOfView) {
          dragToSelectEvent.end = newEnd;
        }
        this.refresh();
      });
  }

  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }

  private refresh() {
    this.events = [...this.events];
    this.cdr.detectChanges();
    console.log(this.events);
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
    this.openDialog('Add', event);
  }

  openDialog(action, obj) {
    if (action === 'Add') {
      const startTime = obj.start.getHours() + ':' + obj.start.getMinutes();
      const endTime = obj.end.getHours() + ':' + obj.end.getMinutes();
      const emptyAppointment: Appointment = {
        name: obj.title || '',
        phone: '',
        date: obj.start,
        startTime,
        endTime,
        description: ''
      };
      obj = emptyAppointment;
    }
    obj.action = action;
    obj.component = 'CompanyFormComponent';
    obj.instance = 'appointment';
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.event === 'Add') {
          this.addRowData(result.data);
        }
      }
    });
  }

  addRowData(rowObj) {
    delete rowObj.action;
    this.appointmentService.createAppointment(rowObj).subscribe(
      (createdCompany) => {
        console.log(createdCompany);
        this.loadAppointments();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
