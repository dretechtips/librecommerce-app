import React from "react";
import Card from "../../components/Card";

function Overview() {
  return (
    <div>
      <div className="row">
        <div className="col">
          <Card theme="success">Release Payment</Card>
        </div>
        <div className="col">
          <Card theme="success">Total Payment This Month</Card>
        </div>
        <div className="col">
          <Card theme="success">Next Payment Date</Card>
        </div>
      </div>
      <Card theme="success">Pay Runs</Card>
    </div>
  );
}

export default Overview;
