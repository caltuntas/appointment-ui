import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  processDefinitions = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'key', 'resource', 'action'];
  constructor() { }

  ngOnInit(): void {
  }
  addNewProcess() {
  }
}
