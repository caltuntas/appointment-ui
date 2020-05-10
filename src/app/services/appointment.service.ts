import { Injectable } from '@angular/core';
import { apiBaseUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  appointmentsEndpoint = 'appointments';
  apiUrl = apiBaseUrl + '/' + this.appointmentsEndpoint;

  constructor(private http: HttpClient) {}

  getAppointments() {
    return this.http.get<any>(this.apiUrl);
  }

  deleteAppointment(id) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  createAppointment(appointmentData) {
    return this.http.post<any>(this.apiUrl, appointmentData);
  }

  updateAppointment(appointmentData) {
    return this.http.put<any>(this.apiUrl, appointmentData);
  }
}
