import CURDComponent from "../../templates/CURD.component";
import { Order, NewOrder } from "../../interface/routes/Order.interface";
import { FormRelation } from "../../interface/Form.interface";
import { LookupbarResult } from "../../interface/Lookupbar.interface";
import { order } from "./TestUnit";

class Archive extends CURDComponent<Order, NewOrder> {
  public name: string = "Order";
  public cQuestions: FormRelation<NewOrder> = {
    username: { question: "Username", input: "text" },
    // Add Table / Chart <= Product Props
    // products: { question: "Products", input: "text" },
    shipping: {
      category: "Shipping",
      questions: {
        provider: { question: "Provider", input: "text" },
        address: { question: "Address", input: "address" }
      }
    },
    cc: {
      category: "Credit Card",
      questions: {
        provider: {
          question: "Provider",
          input: "select",
          props: {
            option: ["Mastercard", "Visa", "Discover"]
          }
        },
        number: { question: "Number", input: "text" },
        expMonth: { question: "Exp. Month", input: "text" },
        expYear: { question: "Exp. Year", input: "text" },
        cvv: { question: "CVV", input: "text" }
      }
    }
  };
  public sQuestions: FormRelation<
    Omit<Order, Exclude<keyof NewOrder, "shipping">>
  > = {
    cancelled: { question: "Cancelled", input: "checkbox" },
    timestamp: { question: "Timestamp", input: "text" },
    id: { question: "ID", input: "text" },
    shipping: {
      category: "Shipping",
      questions: {
        id: { question: "Shipping ID", input: "text" },
        price: { question: "Price", input: "text" },
        provider: { question: "Provider", input: "text" },
        address: { question: "Address", input: "address" }
      }
    }
  };
  public delete = async (id: string) => {};
  public update = async (value: NewOrder) => {};
  public fetch = async (id: string): Promise<Order> => {
    return order;
  };
  public new = async (value: NewOrder) => {};
  public query = async (value: string): Promise<Order[]> => {
    return [order, order, order];
  };
  public toResult = (value: Order): LookupbarResult => {
    return {
      title: value.id,
      description: value.username,
      id: value.id
    };
  };
}

export default Archive;
