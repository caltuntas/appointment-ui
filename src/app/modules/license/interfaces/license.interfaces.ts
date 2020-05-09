export interface License {
  _id?: string;
  data: string;
}

export interface LicenseUI {
  _id?: string;
  licenseNumber: string;
  companyName: string;
  startDate: Date;
  endDate: Date;
  deviceCount: number;
}
