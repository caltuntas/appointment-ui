import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LicenseService {
  getLicensesUrl = `${apiBaseUrl}/licenses`;
  deleteLicensesUrl = `${apiBaseUrl}/licenses`;
  createLicensesUrl = `${apiBaseUrl}/licenses/create`;
  updateLicensesUrl = `${apiBaseUrl}/licenses`;

  constructor(private http: HttpClient) {}

  getLicenses(companyId) {
    return this.http.get<any>(`${this.getLicensesUrl}/${companyId}`);
  }

  deleteLicense(companyId, licenseId) {
    return this.http.delete<any>(
      `${this.deleteLicensesUrl}/${companyId}/${licenseId}`
    );
  }

  createLicense(companyId, licenseData) {
    return this.http.post<any>(
      `${this.createLicensesUrl}/${companyId}`,
      licenseData
    );
  }

  updateLicense(companyId, licenseData) {
    return this.http.put<any>(
      `${this.updateLicensesUrl}/${companyId}/edit`,
      licenseData
    );
  }
}
