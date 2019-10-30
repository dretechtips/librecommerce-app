import { Request, Response, NextFunction } from 'express';
import Customer from '../model/Customer';
import ActiveCustomer from '../model/CustomerActive';
import AccountReset from '../model/AccountReset';
import { HttpMethod, HttpFunction } from '../decorator/HttpMethod';
import { Cookies } from '../interface/Customer.interface';
import { ClientError, ServerError, DatabaseError } from '../type/Error';
import { ExistingBody } from '../interface/Customer.interface';
import CookieFactory from '../factory/Cookie.factory';
import { CookieStorage } from '../interface/Account.interface';

const session: ActiveCustomer = new ActiveCustomer();

const PasswordResetList: AccountReset = new AccountReset();

const cf: CookieFactory = new CookieFactory('customer');

const cs: CookieStorage = {
  accessToken: cf.new('accessToken')
};

export const verify = HttpFunction(
  'ALL',
  'System was unable to verify the customer account.',
  (req, res, next) => {
    const accessToken: string = req.cookies[cs.accessToken.string()] as string;
    const cID: string | null = session.fetch(accessToken);
    if (null) return;
    const customer: Customer[] = Customer.search({ id: cID ? cID : undefined });
    if (customer.length !== 1)
      throw new ServerError("Server didn't fetch one customer account");
    return customer[0];
  }
);

const signin = HttpFunction(
  'POST',
  'System was unable to sign in the customer',
  (req, res) => {
    const { id } = req.body.customer as Pick<ExistingBody, 'id'>;
    const details = Customer.decrypt(id);
    if (!details)
      throw new ServerError(
        "Client didn't provide a valid username or password",
        true
      );
    const [username, password] = details;
    const customer: Customer[] = Customer.search({ username: username });
    if (customer.length !== 1)
      throw new ServerError("Server didn't fetch one customer account");
    if (customer[0].isPassword(password)) {
      const accessToken: string = session.add(customer[0]);
      res.cookie(cs.accessToken.string(), accessToken);
    }

    if (!customer)
      throw new DatabaseError(
        'Database cannot find the username and password.'
      );
    else {
      const accessToken: string = this._session.add(customer);
      res.cookie('customer_access_token', accessToken).send({ success: true });
    }
  }
);

const add = HttpFunction(
  'POST',
  'System was unable to add the customer.',
  (req, res) => {}
);

const update = HttpFunction(
  'PATCH',
  'System was unable to update the customer.',
  (req, res) => {}
);

const remove = HttpFunction(
  'DELETE',
  'System was unable to delete the customer account',
  (req, res) => {}
);

const email = HttpFunction(
  'POST',
  'System was unable to email the customer their password',
  (req, res) => {}
);

const reset = HttpFunction(
  'PATCH',
  'System was unable to reset your password.',
  (req, res) => {}
);

export class CustomerController {
  private static _session = new ActiveCustomer();
  private static _PRList = new PasswordResetList();
  public static reverify(req: Request): Customer | null {}
  @HttpMethod('ALL', "System couldn't verify the access token.")
  public static verify(req: Request, res: Response, next: NextFunction): void {
    const accessToken: string = req.cookies.customer_access_token;
    if (!accessToken)
      throw new ClientError("Client didn't provide a customer access token.");
    const customerID: string | null = this._session.fetch(accessToken);
    if (customerID !== null) return next();
    else
      throw new ServerError(
        "System couldn't find the access token with the sessions."
      );
  }
  @HttpMethod('POST', 'System was unable to sign in the customer')
  public static signin(req: Request, res: Response): void {}
  @HttpMethod('POST', 'System was unable to add the customer.')
  public static add(req: Request, res: Response): void {
    if (!req.body.customer)
      throw new ClientError("Client didn't provide the customer data.");
    const cData: CustomerBody = req.body.customer;
    const customer: Customer = Customer.generate(cData);
    customer.save();
    res.send({ success: true });
  }
  @HttpMethod('DELETE', 'System was unable to delete the customer.')
  public static remove(req: Request, res: Response): void {
    const customerID: string = req.body.customer.id;
    if (!customerID)
      throw new ClientError("Client didn't provide a client ID to the system.");
    const customer: Customer | null = CustomerManager.from.id(
      customerID
    ) as Customer;
    if (customer) this._session.delete(customerID);
  }
  @HttpMethod('PATCH', 'System was unable to update the customer.')
  public static update(req: Request, res: Response): void {
    const customerID: string = req.body.customer.id;
    if (!customerID)
      throw new ClientError("Client didn't send customer ID to the system.");
    const customer: Customer | null = CustomerManager.from.id(
      customerID
    ) as Customer;
    customer.update(req.body);
    customer.save();
  }
  @HttpMethod('POST', 'System was unable to email the customer their password')
  public static emailPassword(req: Request, res: Response): void {
    // A request has been sent to change your password. Here a link to change your password
    // https://rufftiger.com/client/resetpassword
    // Note: The link will expire in 24 hours.
  }
  @HttpMethod('PATCH', 'System was unable to reset your password.')
  public static passwordReset(req: Request, res: Response): void {
    const reset: CustomerPasswordReset = req.body.reset;
    if (!reset)
      throw new ClientError("Client didn't present a reset ID to the system.");
    const customerID: string | null = this._PRList.fetch(reset.id);
    if (!customerID)
      throw new Error(
        'Password Reset List was unable to get the customer ID from the reset ID'
      );
    const customer: Customer | null = CustomerManager.from.id(
      customerID
    ) as Customer;
    const isRemove: boolean = this._PRList.delete(reset.id);
    if (!isRemove)
      throw new ServerError(
        "System couldn't find the client ID from the system."
      );
  }
}
