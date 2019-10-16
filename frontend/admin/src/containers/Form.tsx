import React, { Component } from 'react';
import FormUI from "../components/Form";
import { FormProps, FormState } from '../interface/Form.interface';
import { Loading } from '../components/Loading';

export class Form extends Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = {
      modifier: this.props.modifier,
      values: new Array(this.props.questions.length),
      loading: false,
      success: false
    }
  }
  submit = async (inputs: any[]): Promise<void> => {
    if(this.props.submit && inputs.filter(cur => cur !== undefined).length === inputs.length) {
      const submit = this.props.submit(inputs);
      this.setState({...this.state, loading: true});
      const result = await submit;
      if(result.data.error)
         this.setState({...this.state, error: result.data.error as string, loading: false});
      else
        this.setState({...this.state, success: true, loading: false, error: undefined});
    }
    else {
      this.setState({...this.state, error: "Cannot send a form with invalid or empty values."});
    }
  }
  render() {
    if(this.state.loading)
      return (<Loading />);
    else
      return (
        <FormUI 
        questions={this.props.questions} 
        modifier={this.props.modifier} 
        submit={this.props.submit ? this.submit : undefined} 
        values={this.state.values}
        success={this.state.success}
        error={this.state.error} />
      )
  }
}

export default Form
