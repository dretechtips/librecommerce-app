import CURDComponent from "../../templates/CURD.component";
import { UserData, NewUserData } from "../../interface/routes/User.interface";
import { FormRelation } from "../../interface/Form.interface";
import { LookupbarResult } from "../../interface/Lookupbar.interface";
import { user } from "./UnitTest";

export class Account extends CURDComponent<UserData, NewUserData> {
  public name = "User Account";
  public cQuestions: FormRelation<NewUserData> = {
    username: { question: "Username", input: "text" },
    password: { question: "Password", input: "password" },
    firstName: { question: "First Name", input: "text" },
    lastName: { question: "Last Name", input: "text" },
    emailAddress: { question: "Email Address", input: "email" },
    phoneNum: { question: "Phone Number", input: "text" },
    address: { question: "Address", input: "address" },
    state: { question: "State", input: "text" },
    country: { question: "Country", input: "text" },
    privilege: { question: "Privilege", input: "text" },
    position: { question: "Position", input: "text" },
    payment: { question: "Payment", input: "text" },
    payroll: { question: "Payroll", input: "text" },
    schedule: { question: "Schedule", input: "text" }
  };
  public sQuestions: FormRelation<Omit<UserData, keyof NewUserData>> = {
    id: { question: "ID", input: "text" },
    alerts: { question: "Alerts", input: "tagsbox" },
    associatedIPs: { question: "Associated IP Addresses", input: "tagsbox" },
    lastPayment: { question: "Last Payment Date", input: "text" },
    rank: { question: "Rank", input: "text" }
  };
  public delete = async (id: string): Promise<void> => {};
  public update = async (value: NewUserData): Promise<void> => {};
  public fetch = async (id: string): Promise<UserData> => {
    return user;
  };
  public new = async (value: NewUserData): Promise<void> => {};
  public query = async (value: string): Promise<UserData[]> => {
    return [user, user];
  };
  public toResult = (value: UserData): LookupbarResult => {
    return {
      title: "Username: " + value.username,
      description: "Email Address: " + value.emailAddress,
      id: value.id
    };
  };
}
