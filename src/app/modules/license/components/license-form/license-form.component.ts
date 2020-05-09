import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LicenseUI } from '../../interfaces/license.interfaces';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-license-form',
  templateUrl: './license-form.component.html',
  styleUrls: ['./license-form.component.css'],
})
export class LicenseFormComponent implements OnInit {
  licenseData: LicenseUI;
  licenseForm: FormGroup;

  endDateFilter = (d: Date | null): boolean => {
    return d > this.licenseForm.get('startDate').value;
  }

  constructor(private fb: FormBuilder) {}

  formatDate(date) {
    const parts = date.split('.');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    return new Date(year, month - 1, day);
  }

  ngOnInit(): void {
    // if action === 'Add' only
    if ((this.licenseData as any).action === 'Add') {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + 1);
      this.setCorrectTime(startDate, endDate);

      this.licenseData.startDate = startDate;
      this.licenseData.endDate = endDate;
    } else {
      this.licenseData.startDate = this.formatDate(this.licenseData.startDate);
      this.licenseData.endDate = this.formatDate(this.licenseData.endDate);
      this.setCorrectTime(this.licenseData.startDate, this.licenseData.endDate);
    }

    this.licenseForm = this.fb.group(this.licenseData);
    this.licenseForm.get('licenseNumber').disable();
    this.licenseForm.get('companyName').disable();
    this.licenseForm.get('startDate').setValidators(Validators.required);
    this.licenseForm.get('endDate').setValidators(Validators.required);
    this.licenseForm.get('companyName').setValidators(Validators.required);
    this.licenseForm.get('deviceCount').setValidators(Validators.required);
  }

  getErrors() {
    return JSON.stringify(this.licenseForm.get('endDate').errors);
  }

  setCorrectTime(startDate, endDate) {
    startDate.setHours(23, 59, 0o0);
    endDate.setHours(23, 59, 0o0);
  }

  startDateChanged(type: string, event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      const startDate = event.value;
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      this.setCorrectTime(startDate, endDate);
      this.licenseForm.controls.endDate.setValue(endDate);
    }
  }
}
