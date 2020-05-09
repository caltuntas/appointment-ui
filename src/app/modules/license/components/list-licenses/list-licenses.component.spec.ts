import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLicensesComponent } from './list-licenses.component';

describe('ListLicensesComponent', () => {
  let component: ListLicensesComponent;
  let fixture: ComponentFixture<ListLicensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLicensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
