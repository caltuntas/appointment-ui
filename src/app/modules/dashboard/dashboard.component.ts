import { AppointmentService } from 'src/app/services/appointment.service';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { setHours, setMinutes } from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Subject } from 'rxjs';

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
  refresh: Subject<any> = new Subject();

  constructor(
    private appointmentService: AppointmentService,
  ) {}

  ngOnInit(): void {
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
        const e =  {
          title: result.name,
          start: startDate,
          end: endDate,
        } as CalendarEvent;
        this.events.push(e);
      });
      this.refresh.next();
    });
    console.log(this.events);
  }

  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }
}
