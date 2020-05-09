import { Component, OnInit } from '@angular/core';
import { Company } from '../../interfaces/company.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css'],
})
export class CompanyFormComponent implements OnInit {
  companyData: Company;
  companyForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.companyForm = this.fb.group(this.companyData);
    this.companyForm.get('name').setValidators(Validators.required);
  }
}
