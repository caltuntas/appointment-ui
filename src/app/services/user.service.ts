import { Injectable } from '@angular/core';
import { apiBaseUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUsersUrl = `${apiBaseUrl}/users/`;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>(this.getUsersUrl);
  }
}
