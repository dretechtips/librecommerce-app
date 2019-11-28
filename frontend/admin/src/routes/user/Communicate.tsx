import React from "react";
import MessageForm from "../../containers/MessageForm";
import { UserData } from "../../interface/routes/User.interface";

async function getAccounts(): Promise<UserData[]> {
  return [];
}

function Communicate() {
  return <MessageForm getAccounts={getAccounts} />;
}

export default Communicate;
