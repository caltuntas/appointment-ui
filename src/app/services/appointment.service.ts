import { Injectable } from '@angular/core';
import { apiBaseUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  appointmentsEndpoint = 'appointments';
  apiUrl = apiBaseUrl + '/' + this.appointmentsEndpoint;

  constructor(private http: HttpClient) {}

  getAppointments() {
    return this.http.get<any>(this.apiUrl);
  }

  deleteAppointment(id) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  createAppointment(companyData) {
    return this.http.post<any>(this.apiUrl, companyData);
  }

  updateAppointment(companyData) {
    return this.http.put<any>(
      this.apiUrl,
      companyData,
    );
  }
}
