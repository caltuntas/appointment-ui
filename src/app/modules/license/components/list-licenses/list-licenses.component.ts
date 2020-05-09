import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LicenseUI } from '../../interfaces/license.interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogBoxComponent } from 'src/app/shared/components/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { Company } from 'src/app/modules/company/interfaces/company.interfaces';
import { ActivatedRoute } from '@angular/router';
import { LicenseService } from 'src/app/services/license.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-licenses',
  templateUrl: './list-licenses.component.html',
  styleUrls: ['./list-licenses.component.css'],
})
export class ListLicensesComponent implements OnInit {
  company: Company = { name: '' };
  licenses: MatTableDataSource<LicenseUI>;
  displayedColumns: string[] = [
    'licenseNumber',
    'key',
    'startDate',
    'endDate',
    'deviceCount',
    // 'valid',
    // 'expired',
    // 'limitExceeded',
    // 'companyName',
    'action',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private licenseService: LicenseService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.spinner.show('contentSpinner');
    this.route.paramMap.subscribe((params) => {
      this.company._id = params.get('id');
      this.licenseService.getLicenses(params.get('id')).subscribe((company) => {
        this.company = company;
        this.licenses = new MatTableDataSource(company.licenses);
        this.licenses.paginator = this.paginator;
        this.spinner.hide('contentSpinner');
      });
    });
  }

  centeredText(doc, text, y) {
    const textWidth =
      (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const textOffset = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(textOffset, y, text);
  }

  async downloadLicenseTemplate(rowObj) {
    // Get sechard-logo-license as base64
    this.http
      .get('assets/logo/sechard-logo-license.png', { responseType: 'blob' })
      .subscribe((res) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result;

          this.createLicensePDF(base64data, rowObj);
        };
        reader.readAsDataURL(res);
      });
  }

  private createLicensePDF(base64data: string | ArrayBuffer, rowObj: any) {
    // const doc = new jsPDF({ filters: ['ASCIIHexEncode'] });
    const doc = new jsPDF();

    this.http
      .get('assets/fonts/Roboto-Regular.ttf', { responseType: 'blob' })
      .subscribe((res) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Font = reader.result;
          const base64New = (base64Font as string).substr(
            (base64Font as string).indexOf('base64,') + 7
          );
          doc.addFileToVFS('Roboto-Regular.ttf', base64New);
          doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
          doc.setFont('Roboto');

          const wordWrapWdith = 190;
          // logo
          doc.addImage(base64data, 'png', 10, 10);
          // title
          const titleY = 45;
          doc.setFontSize(10);
          doc.setTextColor(128, 128, 128);
          this.centeredText(doc, 'SECHARD Product License Letter', titleY);
          // company info
          let companyInfoY = titleY + 15;
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);
          doc.text(`${this.company.name}`, 10, companyInfoY);
          doc.text(`${this.company.address},`, 10, (companyInfoY += 5));
          // product license number
          doc.text(
            `Product License Number: ${rowObj.licenseNumber}`,
            10,
            (companyInfoY += 10)
          );
          let contentY = companyInfoY + 15;
          doc.text(`Dear ${this.company.name}`, 10, contentY);
          doc.text(
            `Thank you for purchasing SECHARD product(s) and/or services.`,
            10,
            (contentY += 10)
          );
          doc.text(
            10,
            (contentY += 10),
            doc.splitTextToSize(
              `This License Letter contains your License Number (referenced above) and confirms your right to receive certain products and services from SECHARD as referenced in the chart below.`,
              wordWrapWdith
            )
          );
          doc.text(
            10,
            (contentY += 15),
            doc.splitTextToSize(
              `You will need your License Number to download and receive support on products, access the cloud services and/or confirm your right to receive certain professional services from SECHARD. This License Letter also constitutes full and complete delivery of any software licenses, subscriptions, or cloud services purchased by you.`,
              wordWrapWdith
            )
          );
          doc.text(
            `By using SECHARD products you agree to EULA and other terms published by SECHARD.`,
            10,
            (contentY += 20)
          );
          doc.text(
            10,
            (contentY += 10),
            doc.splitTextToSize(
              `To use the product, you need to request your Product Key by sending an email with your Product License Number (above) to license@sechard.com.`,
              wordWrapWdith
            )
          );
          doc.text(
            `Please distribute this important document to the required individuals within your organization.`,
            10,
            (contentY += 15)
          );
          doc.text(`Sincerely,`, 10, (contentY += 10));
          doc.text(`SECHARD`, 10, (contentY += 10));
          doc.text(`Reseller        : Nebula Bilişim`, 10, (contentY += 10));
          doc.text(`Distributor     : Prolink A.Ş.`, 10, (contentY += 5));
          const textWidth = doc.getTextWidth(`Letter Status - Final`);
          doc.text(`Letter Status - Final`, 10, (contentY += 10));
          doc.line(10, (contentY += 1), 10 + textWidth, contentY);
          // letter status - final table
          doc.autoTable({
            theme: 'grid',
            startY: contentY += 5,
            columnStyles: {
              0: { halign: 'center', valign: 'middle' },
              1: { halign: 'center', valign: 'middle' },
              2: { halign: 'center', valign: 'middle' },
              3: { halign: 'center', valign: 'middle' },
            },
            head: [
              [
                'Product SKU/Description',
                'Quantity/Device',
                'License Type',
                'License Dates/ Support Level',
              ],
            ],
            body: [
              [
                'SCHRD-STD-D50\nSECHARD Studio',
                `${rowObj.deviceCount}`,
                'Subscription',
                `${rowObj.startDate} - ${rowObj.endDate}\nGold Support`,
              ],
            ],
          });
          const textWidth2 = doc.getTextWidth(`Customer Contacts`);
          doc.setDrawColor(0, 0, 0);
          doc.text(`Customer Contacts`, 10, (contentY += 30));
          doc.line(10, (contentY += 1), 10 + textWidth2, contentY);
          // customer contacts table
          doc.autoTable({
            theme: 'grid',
            startY: contentY += 5,
            columnStyles: {
              0: { halign: 'center', valign: 'middle' },
              1: { halign: 'center', valign: 'middle' },
              2: { halign: 'center', valign: 'middle' },
              3: { halign: 'center', valign: 'middle' },
            },
            head: [['Name, Surname', 'Title', 'Email Address', 'Phone']],
            body: [
              [
                'Serkan Akcan',
                `Procurment Manager`,
                'serkan@blabla.com',
                `+90 532 711 29 74`,
              ],
              [
                'Serkan Akcan',
                `Procurment Manager`,
                'serkan@blabla.com',
                `+90 532 711 29 74`,
              ],
            ],
          });
          doc.save(`${rowObj.licenseNumber}.pdf`);
        };
        reader.readAsDataURL(res);
      });
  }

  generateLicenseNumber() {
    return `SCHRD-L${new Date().getTime()}`;
  }

  openDialog(action, obj) {
    if (action === 'Add') {
      const emptyLicenseData: LicenseUI = {
        licenseNumber: this.generateLicenseNumber(),
        startDate: new Date(),
        endDate: new Date(),
        deviceCount: 0,
        companyName: this.company.name,
      };
      obj = emptyLicenseData;
    }
    obj.action = action;
    obj.component = 'LicenseFormComponent';
    obj.instance = 'license';
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
    delete rowObj.component;
    delete rowObj.instance;

    this.licenseService.createLicense(this.company._id, rowObj).subscribe(
      (createdLicense) => {
        this.addRowToDS(createdLicense);
        this.snackBar.open(`Successfully created`, `OK`, {
          duration: 2000,
        });
      },
      (err) => {}
    );
  }

  addRowToDS(rowObj) {
    this.licenses.data.push(rowObj);
    this.licenses._updateChangeSubscription();
  }

  clearDataForUpdate(rowObj) {
    delete rowObj.data;
    delete rowObj.expired;
    delete rowObj.valid;
    delete rowObj.limitExceeded;
    delete rowObj.component;
    delete rowObj.instance;
    delete rowObj.action;
    delete rowObj.key;
  }

  updateRowData(rowObj) {
    this.clearDataForUpdate(rowObj);
    this.licenseService.updateLicense(this.company._id, rowObj).subscribe(
      (data) => {
        this.updateRowOnDS(data);
        this.snackBar.open(`Successfully updated`, `OK`, {
          duration: 2000,
        });
      },
      (err) => {}
    );
  }

  updateRowOnDS(rowObj) {
    const foundItem = this.licenses.data.filter((license) => {
      return license._id === rowObj._id;
    })[0];
    Object.assign(foundItem, rowObj);
    this.licenses._updateChangeSubscription();
  }

  deleteRowData(rowObj) {
    this.licenseService.deleteLicense(this.company._id, rowObj._id).subscribe(
      (data) => {
        this.deleteRowFromDS(rowObj._id);
        this.snackBar.open(`Successfully deleted`, `OK`, {
          duration: 2000,
        });
      },
      (err) => {}
    );
  }

  deleteRowFromDS(rowId) {
    this.licenses.data = this.licenses.data.filter((license) => {
      return license._id !== rowId;
    });
    this.licenses._updateChangeSubscription();
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    if (filterValue === 'yes') {
      filterValue = 'true';
    } else if (filterValue === 'no') {
      filterValue = 'false';
    }
    this.licenses.filter = filterValue;
  }
}
