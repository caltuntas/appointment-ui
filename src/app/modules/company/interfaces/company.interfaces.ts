import { License } from '../../license/interfaces/license.interfaces';

export interface Company {
  _id?: string;
  name: string;
  address?: string;
  phone?: string;
  licenses?: Array<License>;
}
