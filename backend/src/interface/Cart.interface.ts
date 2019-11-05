import ProductVariation from '../model/ProductVariation';
import * as IProduct from '../interface/Product.interface';

export interface Constructor {
  items: ProductVariation[];
}

export interface Value extends Constructor {
  id: string;
}

export interface NewBody {
  items: string[];
}

export interface ExistingBody {
  items: IProduct.ExistingBody[];
  id: string;
}

export interface SearchQuery {}
