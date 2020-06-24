import { UserService } from './../../services/user.service';
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
import { User } from '../scheduler/day-view-scheduler.component';

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
  users: User[];

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
  refreshEvent: Subject<any> = new Subject();
  dragToCreateActive = false;
  weekStartsOn: 0 = 0;

  constructor(
    private appointmentService: AppointmentService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((results) => {
      this.users = [];
      results.forEach(result => {
        const u: User = {
          id : result._id,
          name: result.fullName,
          color: colors.yellow,
        };
        this.users.push(u);
      });
      this.events = [];
      this.appointmentService.getAppointments().subscribe((appointments) => {
        appointments.forEach(result => {
          if (result.operator) {
            const startDate = new Date(result.date);
            const endDate = new Date(result.date);
            const [startHours, startMinutes] = result.startTime.split(':');
            const [endHours, endMinutes] = result.endTime.split(':');
            startDate.setHours(startHours);
            startDate.setMinutes(startMinutes);
            endDate.setHours(endHours);
            endDate.setMinutes(endMinutes);
            const operator = this.users.filter(u => u.id === result.operator);
            const e = {
              title: result.name,
              start: startDate,
              end: endDate,
              color: colors.red,
              meta: {
                user: operator[0],
                description: result.description,
                phone: result.phone,
                _id: result._id,
              },
              draggable: true,
              allDay: false,
            } as CalendarEvent;
            this.events.push(e);
          }
        });
        this.refreshEvent.next();
      });
      this.cdr.detectChanges();
    });
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.events = [...this.events];
  }

  userChanged({ event, newUser }) {
    event.color = newUser.color;
    event.meta.user = newUser;
    this.events = [...this.events];
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

  onHourSegmentClick(args) {
    const event = {
      start: args.date,
      meta: {
        user: args.sourceEvent.user,
      },
    };
    this.openDialog('Add', event);
  }

  openDialog(action, obj) {
    if (action === 'Add') {
      const startHours = obj.start.getHours();
      const startMinutes = obj.start.getMinutes();
      const startTime = startHours + ':' + startMinutes;
      let endTime;
      if (obj.end) {
        endTime = obj.end.getHours() + ':' + obj.end.getMinutes();
      }else {
        endTime = startHours + ':' + (startMinutes + 30);
      }
      const emptyAppointment: Appointment = {
        name: obj.title || '',
        phone: '',
        date: obj.start,
        startTime,
        endTime,
        description: '',
        operator: '',
      };
      if (obj.meta) {
        const meta = obj.meta;
        if (meta.user) {
          emptyAppointment.operator = meta.user.id;
        }
        if (meta.phone) {
          emptyAppointment.phone = meta.phone;
        }
        if (meta.description) {
          emptyAppointment.description = meta.description;
        }
        if (meta._id) {
          emptyAppointment._id = meta._id;
        }
      }
      obj = emptyAppointment;
    }
    if (obj._id) {
      obj.action = 'Update';
    } else {
      obj.action = 'Add';
    }
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
        } else if (result.event === 'Update') {
          this.updateRowData(result.data);
        }
      }
    });
  }

  addRowData(rowObj) {
    delete rowObj.action;
    this.appointmentService.createAppointment(rowObj).subscribe(
      (createdCompany) => {
        console.log(createdCompany);
        this.loadUsers();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateRowData(rowObj) {
    this.appointmentService.updateAppointment(rowObj).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
