import { Component, OnInit } from '@angular/core';
import { Appointment } from '../shared/models/Appointment';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  submitted = false;
  model = new Appointment();
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
  }
}
