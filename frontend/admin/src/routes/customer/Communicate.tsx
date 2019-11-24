import React from "react";
import EmailForm from "../../containers/EmailForm";
import App from "../../containers/App";

function Communicate() {
  return (
    <App.contextType.Consumer>
      {state => <EmailForm logoURL={state.logoURL} />}
    </App.contextType.Consumer>
  );
}

export default Communicate;
