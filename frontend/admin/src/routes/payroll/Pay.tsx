import React from "react";
import Card from "../../components/Card";
import Directory from "../../containers/Directory";
import Account from "../user/Account";

async function search(
  start: number,
  end: number,
  value: string
): Promise<void> {}

function Pay() {
  return (
    <Card theme={"success"} title={"Pay"}>
      <Directory search={search} />
    </Card>
  );
}

export default Pay;
