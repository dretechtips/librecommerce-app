import CURDComponent from "../../templates/CURD.component";
import { UserData, NewUserData } from "../../interface/routes/User.interface";
import { FormRelation } from "../../interface/Form.interface";
import { LookupbarResult } from "../../interface/Lookupbar.interface";
import { user } from "./UnitTest";
import FormField from "../../components/FormField";
import FormFieldGroup from "../../components/FormFieldGroup";

export class Account extends CURDComponent<UserData, NewUserData> {
  public name = "User Accounts";
  public cQuestions: FormRelation<NewUserData> = {
    username: new FormField({ question: { label: "Username", input: "text" } }),
    password: new FormField({
      question: { label: "Password", input: "password" }
    }),
    firstName: new FormField({
      question: { label: "First Name", input: "text" }
    }),
    lastName: new FormField({
      question: { label: "Last Name", input: "text" }
    }),
    emailAddress: new FormField({
      question: { label: "Email Address", input: "email" }
    }),
    phoneNum: new FormField({
      question: { label: "Phone Number", input: "text" }
    }),
    address: new FormField({
      question: { label: "Address", input: "address" }
    }),
    state: new FormField({ question: { label: "State", input: "text" } }),
    country: new FormField({ question: { label: "Country", input: "text" } }),
    privilege: new FormField({
      question: { label: "Privilege", input: "text" }
    }),
    position: new FormField({ question: { label: "Position", input: "text" } }),
    payment: new FormField({ question: { label: "Payment", input: "text" } }),
    payroll: new FormFieldGroup({
      category: "Payroll",
      questions: {
        mode: new FormField({
          question: {
            label: "Mode",
            input: "select",
            props: { option: ["Wage", "Salary", "Commission"] }
          }
        }),
        wage: new FormFieldGroup({
          category: "Wage",
          questions: {
            rate: new FormField({
              question: {
                label: "Hourly Rate in USD",
                input: "text"
              }
            })
          }
        }),
        salary: new FormFieldGroup({
          category: "Salary",
          questions: {
            base: new FormField({
              question: {
                label: "Base",
                input: "text"
              }
            }),
            bonuses: new FormField({
              question: {
                label: "Bonuses",
                input: "tagsbox"
              }
            }),
            deduction: new FormField({
              question: {
                label: "Deductions",
                input: "tagsbox"
              }
            })
          }
        }),
        commission: new FormFieldGroup({
          category: "Commission",
          questions: {
            percent: new FormField({
              question: {
                label: "Percent",
                input: "slider",
                props: {
                  min: 0,
                  max: 100
                }
              }
            })
          }
        })
      }
    }),
    schedule: new FormField({ question: { label: "Schedule", input: "text" } })
  };
  public sQuestions: FormRelation<Omit<UserData, keyof NewUserData>> = {
    id: new FormField({ question: { label: "ID", input: "text" } }),
    alerts: new FormField({ question: { label: "Alerts", input: "tagsbox" } }),
    associatedIPs: new FormField({
      question: { label: "Associated IPs", input: "tagsbox" }
    }),
    lastPayment: new FormField({
      question: { label: "Last Payment Date", input: "text" }
    }),
    rank: new FormField({ question: { label: "Rank", input: "text" } })
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

export default Account;
