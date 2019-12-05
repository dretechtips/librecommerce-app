import { Order } from "../../interface/routes/Order.interface";

export const order: Order = {
  username: "a1234pcree",
  id: "njfodsno5435380hfsd",
  timestamp: "janurary/25/2019",
  cancelled: false,
  shipping: {
    provider: "FEDEX",
    address: "1234 Apple Drive",
    id: "sdjodhhr2432",
    price: 19.2
  },
  cc: {
    provider: "mastercard",
    number: 4327483947324723,
    expMonth: 12,
    expYear: 2019,
    cvv: 432
  }
};
