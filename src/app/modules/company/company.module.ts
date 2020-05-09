import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';

import { ListCompaniesComponent } from './components/list-companies/list-companies.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [ListCompaniesComponent, CompanyFormComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    NgxSpinnerModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatTooltipModule,
  ],
})
export class CompanyModule {}