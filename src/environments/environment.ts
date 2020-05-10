// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { CompanyFormComponent } from 'src/app/modules/company/components/company-form/company-form.component';
import { UserFormComponent } from 'src/app/modules/settings/components/user-form/user-form.component';

export const environment = {
  production: false,
};

// export const apiBaseUrl = 'http://localhost:8000/api';
export const apiBaseUrl = 'https://appointment-service.herokuapp.com/api';

export const componentsMap = {
  CompanyFormComponent,
  UserFormComponent,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
