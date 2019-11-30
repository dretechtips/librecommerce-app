import React from "react";
import MessageForm from "../../containers/MessageForm";
import { getAccounts } from "./Communicate";

function SendPassword() {
  return <MessageForm getAccounts={getAccounts} />;
}

export default SendPassword;
