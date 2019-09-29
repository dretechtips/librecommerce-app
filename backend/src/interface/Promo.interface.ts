import { Discount } from "../type/Discount";
import { DateRange } from "../type/Range";
import { Week } from "../type/Week";

export namespace IPromo {
  export interface Constructor {
    name: string;
    id: string;
    productsID?: string[];
    categoriesID?: string[];
    all?: boolean;
    code: string;
    deal: Discount;
    dateRange: DateRange;
    interval?: Week;
  }

  export interface NewBody {
    name: string,
    id: string,
    productsID?: string[];
    categoriesID?: string[];
    all?: boolean;
    deal: number;
    dateStart: string;
    dateEnd: string,
    interval?: Week;
    code: string
  }

  export interface ExistingBody extends NewBody {

  }
}








