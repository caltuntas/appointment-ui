import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserDetails } from 'src/app/modules/auth/interfaces/auth.interfaces';
// import { UserDetails } from 'src/app/modules/auth/interfaces/auth.interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  currentUser: UserDetails = {
    email: 'example@mail.com',
    fullName: 'User FullName',
  };
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.getCurrentUser()) {
      this.currentUser = this.authService.getCurrentUser();
    }
  }
}
