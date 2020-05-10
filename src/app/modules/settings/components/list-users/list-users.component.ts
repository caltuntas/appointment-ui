import { UserService } from './../../../../services/user.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../../interfaces/settings.interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/shared/components/dialog-box/dialog-box.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit, OnDestroy {
  companies: MatTableDataSource<User>;
  displayedColumns: string[] = ['fullName', 'username', 'password', 'role', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private spinner: NgxSpinnerService,
    private userService: UserService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spinner.show('contentSpinner');
    this.userService.getUsers().subscribe((users) => {
      this.companies = new MatTableDataSource(users);
      this.companies.paginator = this.paginator;
      this.spinner.hide('contentSpinner');
    });
  }

  openDialog(action, obj) {
    if (action === 'Add') {
      const emptyCompanyData: User = { fullName: '', username: '', password: '', role: ''};
      obj = emptyCompanyData;
    }
    obj.action = action;
    obj.component = 'UserFormComponent';
    obj.instance = 'user';
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
    this.userService.createUser(rowObj).subscribe(
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
    this.userService.updateUser(rowObj).subscribe(
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
    this.userService.deleteUser(rowObj._id).subscribe(
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
