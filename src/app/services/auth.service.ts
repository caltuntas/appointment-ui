import { Injectable } from '@angular/core';
import { apiBaseUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginUser } from '../modules/auth/interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginUrl = `${apiBaseUrl}/users/login`;
  userDetails;

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(user: LoginUser) {
    return this.http.post<any>(this.loginUrl, user);
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login']);
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  setCurrentUser(userDetails) {
    localStorage.setItem('currentUser', JSON.stringify(userDetails));
  }
}
