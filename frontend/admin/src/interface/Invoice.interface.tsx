export interface InvoiceProps {
  getAdd(): Promise<InvoiceGoodorService[]>;
  getSubtract(): Promise<InvoiceGoodorService[]>;
  getSendTo(): Promise<InvoiceSendTo>;
  getTerms(): Promise<string>;
  getInvoiceNum(): Promise<number>;
  getDate(): Promise<Date>;
  getComments(): Promise<string>;
}

export interface InvoiceUIProps extends InvoiceProps {
  calcTotalPrice: (GorS: InvoiceGoodorService[]) => number;
  add: InvoiceGoodorService[];
  subtract: InvoiceGoodorService[];
  terms: string | null;
  invoiceNum: number | null;
  date: string | null;
  sendTo: InvoiceSendTo | null;
  comments: string | null;
}

export interface InvoiceState {
  add: InvoiceGoodorService[];
  subtract: InvoiceGoodorService[];
  terms: string | null;
  invoiceNum: number | null;
  date: string | null;
  sendTo: InvoiceSendTo | null;
  comment: string | null;
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
