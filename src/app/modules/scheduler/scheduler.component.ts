import { AppointmentService } from './../../services/appointment.service';
import { UserService } from './../../services/user.service';
import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import { addHours, startOfDay } from 'date-fns';
import { User } from './day-view-scheduler.component';

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
  selector: 'app-scheduler',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
})
export class SchedulerComponent implements OnInit {
  constructor(
    private userService: UserService,
    private appointmentService: AppointmentService,
    private changeDetector: ChangeDetectorRef,
  ){

  }
  viewDate = new Date();

  users: User[];

  events: CalendarEvent[];

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
            color: colors.red,
            meta: {
              user: this.users[0],
            },
            draggable: true,
            allDay: false,
          } as CalendarEvent;
          this.events.push(e);
        });
      });
      this.changeDetector.detectChanges();
    });
  }
}
