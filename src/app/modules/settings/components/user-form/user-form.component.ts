import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../interfaces/settings.interfaces';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  userData: User;
  @ViewChild(NgForm) userForm: NgForm;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
  }
}
