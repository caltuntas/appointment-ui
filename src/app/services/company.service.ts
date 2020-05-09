import { Injectable } from '@angular/core';
import { apiBaseUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  getCompaniesUrl = `${apiBaseUrl}/companies`;
  deleteCompanyUrl = `${apiBaseUrl}/companies`;
  createCompanyUrl = `${apiBaseUrl}/companies/create`;
  updateCompanyUrl = `${apiBaseUrl}/companies`;

  constructor(private http: HttpClient) {}

  getCompanies() {
    return this.http.get<any>(this.getCompaniesUrl);
  }

  deleteCompany(id) {
    return this.http.delete<any>(`${this.deleteCompanyUrl}/${id}`);
  }

  createCompany(companyData) {
    return this.http.post<any>(`${this.createCompanyUrl}`, companyData);
  }

  updateCompany(companyData) {
    return this.http.put<any>(
      `${this.updateCompanyUrl}/${companyData._id}/edit`,
      companyData,
    );
  }
}
