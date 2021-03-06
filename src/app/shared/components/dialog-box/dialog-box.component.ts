import {
  Component,
  OnInit,
  Optional,
  Inject,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from 'src/app/modules/company/interfaces/company.interfaces';
import { CompanyFormComponent } from 'src/app/modules/company/components/company-form/company-form.component';
import { UserFormComponent } from 'src/app/modules/settings/components/user-form/user-form.component';

export const componentsMap = {
  CompanyFormComponent,
  UserFormComponent,
};

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css'],
})
export class DialogBoxComponent implements OnInit, AfterViewInit {
  action: string;
  localData: any;

  componentRef: any;

  @ViewChild('dynamicForm', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Appointment,
    private resolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef
  ) {
    this.localData = { ...data };
    this.action = this.localData.action;
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.action !== 'Delete') {
        this.createDynamicFormComponent();
      }
      this.cd.detectChanges();
    });
  }
  ngOnInit(): void {}

  createDynamicFormComponent() {
    this.entry.clear();
    // get component by it's string name
    const factory = this.resolver.resolveComponentFactory(
      componentsMap[this.localData.component]
    );
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance[
      `${this.localData.instance}Data`
    ] = this.localData;
  }

  isFormValid() {
    if (this.componentRef) {
      return !this.componentRef.instance[`${this.localData.instance}Form`]
        .valid;
    }
  }

  doAction() {
    if (this.action === 'Add' || this.action === 'Update') {
       const instance =  this.componentRef.instance;
       const data = instance[`${this.localData.instance}Data`];
       this.dialogRef.close({
        event: this.action,
        data
      });
    } else {
      this.dialogRef.close({ event: this.action, data: this.localData });
    }
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
