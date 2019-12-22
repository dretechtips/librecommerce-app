import CURDComponent from "../../templates/CURD.component";
import {
  Shipping,
  NewShipping
} from "../../interface/routes/Shipping.interface";
import { FormRelation } from "../../interface/Form.interface";
import { LookupbarResult } from "../../interface/Lookupbar.interface";
import { shipping } from "./TestUnit";
import FormField from "../../components/FormField";

export class Archive extends CURDComponent<Shipping, NewShipping> {
  public name = "Shipping";
  public cQuestions: FormRelation<NewShipping> = {
    provider: new FormField({
      question: {
        label: "Provider",
        input: "select",
        props: {
          option: ["FEDEX", "UPS", "USPS"]
        }
      }
    }),
    address: new FormField({ question: { label: "Address", input: "address" } })
  };
  public sQuestions: FormRelation<Omit<Shipping, keyof NewShipping>> = {
    id: new FormField({ question: { label: "ID", input: "text" } }),
    price: new FormField({ question: { label: "Price", input: "text" } })
  };
  public update = async (value: NewShipping): Promise<void> => {};
  public delete = async (id: string): Promise<void> => {};
  public fetch = async (id: string): Promise<Shipping> => {
    return shipping;
  };
  public query = async (value: string): Promise<Shipping[]> => {
    return [shipping, shipping, shipping];
  };
  public new = async (value: NewShipping): Promise<void> => {};
  public toResult = (value: Shipping): LookupbarResult => {
    return {
      title: "Address: " + value.address,
      description: "Provider: " + value.provider,
      id: value.id
    };
  };
}

export default Archive;
