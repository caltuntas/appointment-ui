import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Appointment } from '../../interfaces/company.interfaces';
import { AppointmentService } from 'src/app/services/appointment.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/shared/components/dialog-box/dialog-box.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.css'],
})
export class ListCompaniesComponent implements OnInit, OnDestroy {
  companies: MatTableDataSource<Appointment>;
  displayedColumns: string[] = ['name', 'phone', 'date', 'startTime', 'endTime', 'description', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private spinner: NgxSpinnerService,
    private appointmentService: AppointmentService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spinner.show('contentSpinner');
    this.appointmentService.getAppointments().subscribe((companies) => {
      this.companies = new MatTableDataSource(companies);
      this.companies.paginator = this.paginator;
      this.spinner.hide('contentSpinner');
    });
  }

  openDialog(action, obj) {
    if (action === 'Add') {
      const emptyCompanyData: Appointment = { name: '', phone: '', date: '', startTime: '', endTime: '', description: '' };
      obj = emptyCompanyData;
    }
    obj.action = action;
    obj.component = 'CompanyFormComponent';
    obj.instance = 'appointment';
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.event === 'Add') {
          this.addRowData(result.data);
        } else if (result.event === 'Update') {
          this.updateRowData(result.data);
        } else if (result.event === 'Delete') {
          this.deleteRowData(result.data);
        }
      }
    });
  }

  addRowData(rowObj) {
    delete rowObj.action;
    this.appointmentService.createAppointment(rowObj).subscribe(
      (createdCompany) => {
        this.addRowToDS(createdCompany);
        this.snackBar.open(`Successfully created`, `${rowObj.name}`, {
          duration: 2000,
        });
      },
      (err) => {}
    );
  }

  updateRowOnDS(rowObj) {
    const foundItem = this.companies.data.filter((company) => {
      return company._id === rowObj._id;
    })[0];
    Object.assign(foundItem, rowObj);
    this.companies._updateChangeSubscription();
  }

  updateRowData(rowObj) {
    this.appointmentService.updateAppointment(rowObj).subscribe(
      (data) => {
        this.updateRowOnDS(rowObj);
        this.snackBar.open(`Successfully updated`, `${rowObj.name}`, {
          duration: 2000,
        });
      },
      (err) => {}
    );
  }

  addRowToDS(rowObj) {
    this.companies.data.push(rowObj);
    this.companies._updateChangeSubscription();
  }

  deleteRowFromDS(rowId) {
    this.companies.data = this.companies.data.filter((company) => {
      return company._id !== rowId;
    });
    this.companies._updateChangeSubscription();
  }

  deleteRowData(rowObj) {
    this.appointmentService.deleteAppointment(rowObj._id).subscribe(
      (data) => {
        this.deleteRowFromDS(rowObj._id);
        this.snackBar.open(`Successfully deleted`, `${rowObj.name}`, {
          duration: 2000,
        });
      },
      (err) => {}
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.companies.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.spinner.hide('contentSpinner');
  }
}
