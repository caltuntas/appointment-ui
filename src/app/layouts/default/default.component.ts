import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
})
export class DefaultComponent implements OnInit {
  headerMenuIcon = 'menu';
  contentMargin = 70;
  sideBarOpen = false;
  contentSpinner = 'contentSpinner';

  constructor() {}

  ngOnInit(): void {}

  sideBarToggler(event) {
    this.sideBarOpen = !this.sideBarOpen;
    this.sideBarOpen
      ? (this.headerMenuIcon = 'menu_open')
      : (this.headerMenuIcon = 'menu');

    this.sideBarOpen ? (this.contentMargin = 240) : (this.contentMargin = 70);
  }
}
