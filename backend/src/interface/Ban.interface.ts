import { IPAddress } from '../type/Location';

export interface NewBody {
  customerID: string;
  reason: string;
}

export interface ExistingBody extends NewBody {
  id: string;
}

export interface SearchQuery {
  customerID: string;
  date: Date;
  ipAddress: IPAddress[];
  id: string;
}
