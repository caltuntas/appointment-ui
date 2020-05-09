import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() menuIcon: string;
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
  }

  logoutUser() {
    this.authService.logoutUser();
  }
}
