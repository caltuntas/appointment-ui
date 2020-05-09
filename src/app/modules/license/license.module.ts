import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicenseRoutingModule } from './license-routing.module';
import { ListLicensesComponent } from './components/list-licenses/list-licenses.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { LicenseFormComponent } from './components/license-form/license-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [ListLicensesComponent, LicenseFormComponent],
  imports: [
    CommonModule,
    LicenseRoutingModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
  ],
})
export class LicenseModule {}
