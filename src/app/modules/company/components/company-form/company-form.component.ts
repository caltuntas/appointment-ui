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
  @ViewChild(NgForm) appointmentForm: NgForm;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
  }
}
