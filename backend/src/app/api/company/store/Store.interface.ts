import ContactSchema from "src/app/common/model/schema/Contact.schema";

export interface StoreDOT {
  codeName: string;
  type: StoreType;
  contact: ContactSchema;
}

export enum StoreType {
  SM_RETAIL,
  MD_RETAIL,
  LG_RETAIL,
  SM_WHOLESALE,
  MD_WHOLESALE,
  LG_WHOLESALE,
  SM_BOTH,
  MD_BOTH,
  LG_BOTH
}
