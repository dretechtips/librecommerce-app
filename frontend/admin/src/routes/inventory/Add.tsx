import React, { Component } from 'react'
import { FormQuestion } from "../../interface/Form.interface";
import { Form } from "../../components/Form";
import { InventoryAddProps, InventoryAddState } from "../../interface/routes/Inventory.interface";
import Card from '../../components/Card';
import Tabs from "../../containers/Tabs";

export class Add extends Component<InventoryAddProps, InventoryAddState> {
  constructor(props: InventoryAddProps)
  {
    super(props);
    this.state = {
      questions: "basic",
    }
  }
  changeQuestion = (name: string) =>
  {
    this.setState({...this.state, questions: name as "advance" | "basic"});
  }
  renderForm()
  {
    switch(this.state.questions) {
      case "basic":
        return (<Form questions={this.props.basicQuestion} modifier="write"/>);
      case "advance":
        return (<Form questions={this.props.advanceQuestion} modifier="write" />);
    }
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Card title="New Product Detail" theme="success">
                <div className="row">
                  <div className="col-md-6">
                    {/* <Tabs theme="primary" pills={[{name: "Basic", children={}}, {name: "Advance", change: this.changeQuestion, changeArg: "advance"}]} />
                    {this.renderForm()} */}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Add

