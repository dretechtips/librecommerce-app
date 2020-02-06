import Order from "../order/Order.model";
import Shipping from "../shipping/Shipping.model";
import Cart from "../cart/Cart.model";
import Transaction from "../transaction/Transaction.model";
import Customer from "../account/customer/Customer.model";
import OrderService from "../order/Order.service";
import CartService from "../cart/Cart.service";
import CustomerService from "../account/customer/Customer.service";
import ShippingService from "../shipping/Shipping.service";
import TransactionService from "../transaction/Transaction.service";

export interface SaleDOT {
  orderID: string;
  shippingID: string;
  cartID: string;
  transactionID: string;
  customerID: string;
}

export interface SaleObject {
  order: Order;
  shipping: Shipping;
  cart: Cart;
  transaction: Transaction;
  customer: Customer;
}


