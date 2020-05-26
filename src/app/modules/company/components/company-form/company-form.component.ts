import { User } from './../../../settings/interfaces/settings.interfaces';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Appointment } from '../../interfaces/company.interfaces';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css'],
})
export class CompanyFormComponent implements OnInit {
  appointmentData: Appointment;
  users: User[];
  @ViewChild(NgForm) appointmentForm: NgForm;

  constructor(private fb: FormBuilder,
              private userService: UserService,
    ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
    console.log(this.appointmentData);
  }
}
