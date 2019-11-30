import CURDComponent from "../../templates/CURD.component";
import {
  Shipping,
  NewShipping
} from "../../interface/routes/Shipping.interface";
import { FormRelation } from "../../interface/Form.interface";
import { LookupbarResult } from "../../interface/Lookupbar.interface";
import { shipping } from "./TestUnit";

export class Archive extends CURDComponent<Shipping, NewShipping> {
  public name = "Shipping";
  public cQuestions: FormRelation<NewShipping> = {
    provider: {
      question: "Provider",
      input: "select",
      options: ["FEDEX", "USPS", "UPS"]
    },
    address: { question: "Address", input: "address" }
  };
  public sQuestions: FormRelation<Omit<Shipping, keyof NewShipping>> = {
    id: { question: "ID", input: "text" },
    price: { question: "Price", input: "text" }
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
