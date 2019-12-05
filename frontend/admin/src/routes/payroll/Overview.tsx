import React from "react";
import Card from "../../components/Card";

function Overview() {
  return (
    <div>
      <div className="row">
        <Card theme="success">Release Payment</Card>
        <Card theme="success">Total Wage Last Month</Card>
        <Card theme="success">Next Payment Date</Card>
      </div>
      <Card theme="success">Pay Runs</Card>
      <Card theme="success"></Card>
    </div>
  );
}

export default Overview;
