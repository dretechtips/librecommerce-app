import { ContactDependentDOT } from "src/app/common/model/schema/Contact.schema";

export interface CompanyDOT extends ContactDependentDOT {
  taxID: string;
  active: boolean;
  name: string;
}
