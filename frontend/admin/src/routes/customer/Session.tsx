import React from "react";
import ServerSelect from "../../containers/ServerSelect";

function Session() {
  return (
    <ServerSelect lookupURL={"https://example.com"}>
      {(servers, serverID) => {
        return <div></div>;
      }}
    </ServerSelect>
  );
}

export default Session;
