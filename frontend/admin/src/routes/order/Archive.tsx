import CURDComponent from "../../templates/CURD.component";
import { Order, NewOrder } from "../../interface/routes/Order.interface";
import { FormRelation } from "../../interface/Form.interface";
import { LookupbarResult } from "../../interface/Lookupbar.interface";
import { order } from "./TestUnit";
import FormField from "../../components/FormField";
import FormFieldGroup from "../../components/FormFieldGroup";

class Archive extends CURDComponent<Order, NewOrder> {
  public name: string = "Order";
  public cQuestions: FormRelation<NewOrder> = {
    username: new FormField({ question: { label: "Username", input: "text" } }),
    // Add Table / Chart <= Product Props
    // products: { question: "Products", input: "text" },
    shipping: new FormFieldGroup({
      category: "Shipping",
      questions: {
        provider: new FormField({
          question: { label: "Provider", input: "text" }
        }),
        address: new FormField({
          question: { label: "Address", input: "address" }
        })
      }
    }),
    cc: new FormFieldGroup({
      category: "Credit Card",
      questions: {
        provider: new FormField({
          question: {
            label: "Provider",
            input: "select",
            props: {
              option: ["Mastercard", "Visa", "Discover"]
            }
          }
        }),
        number: new FormField({ question: { label: "Number", input: "text" } }),
        expMonth: new FormField({
          question: { label: "Exp. Month", input: "text" }
        }),
        expYear: new FormField({
          question: { label: "Exp. Year", input: "text" }
        }),
        cvv: new FormField({ question: { label: "CVV", input: "text" } })
      }
    })
  };
  public sQuestions: FormRelation<
    Omit<Order, Exclude<keyof NewOrder, "shipping">>
  > = {
    cancelled: new FormField({
      question: { label: "Cancelled", input: "checkbox" }
    }),
    timestamp: new FormField({
      question: { label: "Timestamp", input: "text" }
    }),
    id: new FormField({ question: { label: "ID", input: "text" } }),
    shipping: new FormFieldGroup({
      category: "Shipping",
      questions: {
        ...this.cQuestions.shipping.questions(),
        id: new FormField({ question: { label: "ID", input: "text" } }),
        price: new FormField({ question: { label: "Price", input: "text" } })
      }
    })
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
