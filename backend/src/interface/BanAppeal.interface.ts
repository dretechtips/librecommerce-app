import Ban from '../model/Ban';
import * as IBan from '../interface/Ban.interface';
import { IPAddress } from '../type/Location';

export interface Constructor {
  msg: string;
  ban: Ban;
}

export interface AppealBody {
  id: string;
  message: string;
}

export interface AppealReview {
  id: string;
  resolution: 'resolve' | 'reject';
}

export interface SearchQuery {
  customerID: string;
  date: Date;
  ipAddress: IPAddress[];
  id: string;
}
