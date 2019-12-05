export interface InvoiceProps {
  comments: string;
  getAdd(): Promise<InvoiceGoodorService[]>;
  getSubtract(): Promise<InvoiceGoodorService[]>;
  sendTo: Promise<InvoiceSendTo[]>;
  terms: string;
}

export interface InvoiceUIProps extends InvoiceProps {
  add: InvoiceGoodorService[];
  subtract: InvoiceGoodorService[];
}

export interface InvoiceState {
  add: InvoiceGoodorService[];
  subtract: InvoiceGoodorService[];
}

export interface InvoiceGoodorService {
  name: string;
  description: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface InvoiceSendTo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
}
