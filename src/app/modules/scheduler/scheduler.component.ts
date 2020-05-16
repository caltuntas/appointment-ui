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

let users: User[] = [
  {
    id: 0,
    name: 'John smith',
    color: colors.yellow,
  },
  {
    id: 1,
    name: 'Jane Doe',
    color: colors.blue,
  },
];

@Component({
  selector: 'app-scheduler',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
})
export class SchedulerComponent implements OnInit {
  constructor(
    private userService: UserService,
    private changeDetector: ChangeDetectorRef,
  ){

  }
  viewDate = new Date();

  users = users;

  events: CalendarEvent[] = [
    {
      title: 'An event',
      color: users[0].color,
      start: addHours(startOfDay(new Date()), 5),
      meta: {
        user: users[0],
      },
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      title: 'Another event',
      color: users[1].color,
      start: addHours(startOfDay(new Date()), 2),
      meta: {
        user: users[1],
      },
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      title: 'A 3rd event',
      color: users[0].color,
      start: addHours(startOfDay(new Date()), 7),
      meta: {
        user: users[0],
      },
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      title: 'An all day event',
      color: users[0].color,
      start: new Date(),
      meta: {
        user: users[0],
      },
      draggable: true,
      allDay: true,
    },
    {
      title: 'Another all day event',
      color: users[1].color,
      start: new Date(),
      meta: {
        user: users[1],
      },
      draggable: true,
      allDay: true,
    },
    {
      title: 'A 3rd all day event',
      color: users[0].color,
      start: new Date(),
      meta: {
        user: users[0],
      },
      draggable: true,
      allDay: true,
    },
  ];

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
      results.forEach(result => {
        const u: User = {
          id : result._id,
          name: result.fullName,
          color: colors.yellow,
        };
        this.users.push(u);
      });
      this.changeDetector.detectChanges();
    });
    console.log(this.events);
  }
}
