import React from "react";
import EmailForm from "../../containers/EmailForm";
import MessageForm from "../../containers/MessageForm";
import App from "../../containers/App";
import { CustomerData } from "../../interface/routes/Customer.interface";

export async function getAccounts(): Promise<CustomerData[]> {
  return [];
}

function Communicate() {
  return <MessageForm getAccounts={getAccounts} />;
}

export default Communicate;
