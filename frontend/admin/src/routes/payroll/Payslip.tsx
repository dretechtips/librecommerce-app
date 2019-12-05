import React, { Component } from "react";
import { Payroll } from "../../interface/routes/Payroll.interface";

async function getPayslip(userID: string): Promise<Payroll> {}

export class Payslip extends Component {
  constructor(props) {
    super(props);
  }
  getPayslip() {}
  public componentDidMount() {}
  public render() {
    return <PayslipUI />;
  }
}

function PayslipUI(props) {
  return <div></div>;
}

export default Payslip;
