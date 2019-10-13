import React, { Component } from 'react';
import List from "../../containers/List";
import { ListItems } from "../../interface/List.interface";
import Card from '../../components/Card';
import { useHistory, Redirect } from "react-router-dom";
import { UnprocessedState, UnprocessedUIProps } from '../../interface/routes/Order.interface';

class Unprocessed extends Component<{}, UnprocessedState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      avaliable: {
        elements: [
          {value: "Order 1", id: "OrderID1"},
          {value: "Order 2", id: "OrderID2"}
        ],
        actions: [
          {func: this.details, icon: "fas fa-info-circle", name: "Details"},
          {func: this.halt, icon: "fas fa-hand-paper", name: "Halt"},
          {func: this.complete, icon: "fas fa-check", name: "Complete"},
        ] 
      },
      halted: {
        elements: [
          {value: "Order 3", id: "OrderID3"},
          {value: "Order 4", id: "OrderID4"}
        ],
        actions: [
          {func: this.details, icon: "fas fa-info-circle", name: "Details"},
          {func: this.complete, icon: "fas fa-check", name: "Complete"},
        ]
      }
    }
  }
  details = (id: string) => {
    this.setState({...this.state, details: id});
  }
  remove = (id: string) => {
    
  }
  halt = (id: string) => {
    const el = this.state.avaliable.elements.find(x => x.id === id);
    if(el)
      this.state.halted.elements.push(el);
    const aval = this.state.avaliable;
    this.setState({...this.state, avaliable: {...this.state.avaliable, elements: aval.elements.filter(x => x.id !== id)}});
  }
  complete = (id: string) => {
    //const el = this.state.avaliable.elements.find(x => x.id === id) || this.state.halted.elements.find(x => x.id === id);
    const avalf = this.state.avaliable.elements.filter(x => x.id !== id);
    const haltf = this.state.halted.elements.filter(x => x.id !== id);
    this.setState({...this.state, avaliable: {...this.state.avaliable, elements: avalf}, halted: {...this.state.halted, elements: haltf}});
  }
  render() {
    if(this.state.details)
      return <Redirect to={"/order/details/" + this.state.details} push></Redirect>
    else
      return <UnprocessedUI 
        halt={this.halt} 
        halted={this.state.halted}
        avaliable={this.state.avaliable}
        complete={this.complete} />
  }
}

function UnprocessedUI(props: UnprocessedUIProps) {
  const history = useHistory();
  const add = () => history.push("/order/add");
  return (
    <React.Fragment>
      <Card title={"Avaliable Orders"} theme="success">
        <List items={props.avaliable} add={add} />
        <span className="small text-secondary mt-2">{"Orders last update as of "}<span className="font-weight-bold">{(new Date).toString()}</span></span>
      </Card>
      <Card title="Halted Orders" theme="success">
        <List items={props.halted} />
        <span className="small text-secondary mt-2">{"Orders last update as of "}<span className="font-weight-bold">{(new Date).toString()}</span></span>
      </Card>
    </React.Fragment>
  )
}

export default Unprocessed
