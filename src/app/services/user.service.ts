import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersEndpoint = 'users';
  apiUrl = environment.apiBaseUrl + '/' + this.usersEndpoint;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>(this.apiUrl);
  }

  deleteUser(id) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  createUser(userData) {
    return this.http.post<any>(this.apiUrl, userData);
  }

  updateUser(userData) {
    return this.http.put<any>(
      this.apiUrl,
      userData,
    );
  }
}
