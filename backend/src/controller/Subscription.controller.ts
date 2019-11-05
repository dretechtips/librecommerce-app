import { Request, Response } from 'express';
import { HttpMethod, HttpFunction } from '../decorator/Http.decorator';
import { ISubscription } from '../interface/Subscription.interface';
import {
  Subscription,
  PackageManager,
  Package,
  PackageOwner
} from '../model/Subscription';
import { ClientError } from '../type/Error';
import Customer from '../model/Customer';
import { Discount } from '../type/Discount';
import * as CustomerController from './Customer.controller';

export namespace Admin {
  export const add = HttpFunction(
    'POST',
    'System was unable to add a subscription package.',
    (req, res) => {}
  );
  export const remove = HttpFunction(
    'DELETE',
    'System was unable to delete a subscription.',
    (req, res) => {}
  );
  export const update = HttpFunction(
    'POST',
    'System was unable to update a subscription.',
    (req, res) => {}
  );
  export const list = HttpFunction(
    'GET',
    'System was unable to list the subscriptions.',
    (req, res) => {}
  );
}

export namespace Client {
  export const add = HttpFunction();
  export const remove = HttpFunction();
  export const update = HttpFunction();
  export const list = HttpFunction();
}
export class AdminSubscriptionController {
  @HttpMethod()
  public static add(req: Request, res: Response): void {
    const pBody: ISubscription.Admin.Package.Body =
      req.body.subscription.package;
    const pack: Package = new Package(
      pBody.name,
      pBody.productsID,
      new Discount(pBody.discount)
    );
    pack.setType('admin');
    pack.save();
  }
  @HttpMethod()
  public static remove(req: Request, res: Response): void {
    const packageID: string = req.body.subscription.package.id;
    const pack: Package | null = PackageManager.from.id(packageID);
    if (!pack) throw new ClientError('Client provided an invalid package.');
    else pack.delete();
  }
  @HttpMethod()
  public static update(req: Request, res: Response): void {
    const pID: string = req.body.subscription.package.id;
    const pBody: ISubscription.Admin.Package.Body =
      req.body.subscription.package;
    const pack: Package | null = PackageManager.from.id(pID);
    if (pack) pack.update(pBody);
    else throw new ClientError("Client subscription id doesn't exist");
  }

  @HttpMethod()
  public static list(req: Request, res: Response): void {
    const packs: Package[] | null = PackageManager.from.all();
    if (packs)
      res.send({ success: true, packages: packs.map(cur => cur.toPrimObj()) });
    else res.send({ success: true, packages: [] });
  }
}

export class ClientSubscriptionController {
  @HttpMethod('POST', 'System was unable to add a client package.')
  public static add(req: Request, res: Response) {
    /* Add to customer account
     */
    const pBody: ISubscription.Client.Package.Body =
      req.body.subscription.package;
    const pack: Package = new Package(pBody.name, pBody.productsID);
    pack.setType('client');
    pack.save();
  }
  @HttpMethod('DELETE', 'System was unable to delete a client package.')
  public static remove(req: Request, res: Response): void {
    const pID: string = req.body.subscription.package.id;
    const customer: Customer | null = CustomerController.reverify(req);
    if (customer) {
      const sub: Subscription = new Subscription(customer);
      const pack: Package | null = sub.finder.id(pID);
      if (pack) {
        customer.removeSubPackages(pID);
        if (pack.getType() === 'client') pack.delete();
      } else throw new ClientError('Client provided an invalid package id.');
    } else throw new ClientError('Client provided an invalid access token');
  }
  @HttpMethod('PATCH', 'System was unable to update a client package.')
  public static update(req: Request, res: Response) {
    const pID: string = req.body.subscription.package.id;
    const customer: Customer | null = CustomerController.reverify(req);
    if (customer) {
      const sub: Subscription = new Subscription(customer);
      const pack: Package | null = sub.finder.id(pID);
      if (pack)
        if (pack.getType() === 'client')
          pack.update(req.body.subscription.package);
        else
          throw new ClientError(
            'Client has no permission to delete an admin created subscription.'
          );
      else throw new ClientError('Client provided an an invalid id.');
    } else throw new ClientError('Client provided an invalid package id.');
  }
  @HttpMethod('GET', 'System was unable to list the client package.')
  public static list(req: Request, res: Response) {
    const customer: Customer | null = CustomerController.reverify(req);
    if (customer) {
      const sub: Subscription = new Subscription(customer);
      const cPacks: Package[] = sub.listPackages();
      const aPacks: Package[] | null = PackageManager.from.admin();
      res.send({
        success: true,
        clientPackages: cPacks.map(cur => cur.toPrimObj()),
        adminPackages: aPacks ? aPacks.map(cur => cur.toPrimObj()) : []
      });
    }
  }
}
