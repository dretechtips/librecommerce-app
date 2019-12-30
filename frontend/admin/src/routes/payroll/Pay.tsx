import React from "react";
import Card from "../../components/Card";
import Directory from "../../containers/Directory";
import Account from "../user/Account";

interface Placeholder {
  name: string;
}

async function search(
  start: number,
  end: number,
  value: string
): Promise<Placeholder[]> {
  return [
    {
      name: "Name"
    }
  ];
}

function Pay() {
  return (
    <Card theme={"success"} title={"Pay"}>
      <Directory<Placeholder> search={search} />
    </Card>
  );
}

export default Pay;
