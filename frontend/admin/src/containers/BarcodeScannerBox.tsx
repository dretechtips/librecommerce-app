import React, {ComponentType, Component} from 'react'
import Quagga from "quagga";
import Button from '../components/Button'
import { ButtonProps } from '../interface/Button.interface'
import { BarcodeScannerState, BarcodeScannerProps } from "../interface/BarcodeScannerBox.interface";
import BarcodeScannerBoxUI from "../components/BarcodeScannerBox";

class BarcodeScannerBox extends Component<BarcodeScannerProps, BarcodeScannerState> {
  cameraView: HTMLDivElement | null;
  constructor(props: BarcodeScannerProps) {
    super(props);
    this.state = {
      mode: "standby",
      value: "",
      error: null,
    }
    this.cameraView = null;
  }
  start = () => {
    this.setState({...this.state, mode: "scanning"});
  }
  init = (ref: HTMLDivElement | null): void => {
    if(ref === null)
      return;
    this.cameraView = ref;
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: this.cameraView!,
      },
      decoder: {
        readers: ["code_128_reader"]
      }
    }, (err) => {
      if(err) {
        this.componentDidCatch(err);
        return;
      }
      Quagga.start();
      Quagga.onDetected(cur => {
        if(this.state.mode !== "complete") {
          alert("Captured");
          Quagga.stop();
          this.setState({...this.state, mode: "complete", value: cur.codeResult.code});
        };
      });
    });
  }
  exit = () => {
    Quagga.stop();
    this.setState({...this.state, mode: "standby"});
  }
  componentDidCatch(error: Error) {
    console.log(error);
    this.setState({...this.state, mode: "error", error: error});
  }
  render() {
    return <BarcodeScannerBoxUI
    mode={this.state.mode}
    value={this.state.value}
    start={this.start}
    init={this.init}
    exit={this.exit}
    error={this.state.error} />
  }
}

export default BarcodeScannerBox
