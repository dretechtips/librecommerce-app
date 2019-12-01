import React, { ComponentType, Component } from "react";
import Quagga from "quagga";
import Button from "../components/Button";
import { ButtonProps } from "../interface/Button.interface";
import {
  BarcodeScannerState,
  BarcodeScannerProps,
  BarcodeScannerType
} from "../interface/BarcodeScannerBox.interface";
import BarcodeScannerBoxUI from "../components/BarcodeScannerBox";

class BarcodeScannerBox extends Component<
  BarcodeScannerProps,
  BarcodeScannerState
> {
  cameraView: HTMLDivElement | null;
  camera: HTMLVideoElement | null;
  constructor(props: BarcodeScannerProps) {
    super(props);
    this.state = {
      mode: "standby",
      value: this.props.value ? String(this.props.value) : "",
      error: null,
      scanType: "upc"
    };
    this.cameraView = null;
    this.camera = null;
  }
  readerAdapter(): string {
    switch (this.state.scanType) {
      case "ean":
        return "ean_reader";
      case "upc":
        return "upc_reader";
      case "code_128":
        return "code_128_reader";
      case "code_39":
        return "code_39_reader";
      case "code_93":
        return "code_93_reader";
      case "codabar":
        return "codebar_reader";
      case "i2of5":
        return "i2of5_reader";
    }
  }
  start = () => {
    this.setState({ ...this.state, mode: "selecting" });
  };
  init = (ref: HTMLDivElement | null): void => {
    if (ref === null) return;
    this.cameraView = ref;
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: this.cameraView!
        },
        decoder: {
          readers: [this.readerAdapter()]
        }
      },
      err => {
        if (err) {
          this.componentDidCatch(err);
          return;
        }
        Quagga.start();
        Quagga.onDetected(cur => {
          if (this.state.mode !== "complete") {
            alert("Captured");
            Quagga.stop();
            this.setState({
              ...this.state,
              mode: "complete",
              value: cur.codeResult.code
            });
          }
        });
      }
    );
  };
  cameraSetup = (ref: HTMLVideoElement | null) => {
    if (ref === null) return;
    this.camera = ref;
  };
  fullscreen = () => {
    if (!this.camera) return;
    if (this.camera.requestFullscreen) this.camera.requestFullscreen();
    else if (this.camera.webkitEnterFullScreen)
      this.camera.webkitEnterFullScreen();
  };
  updateScanner = (id: BarcodeScannerType) => {
    this.setState({ ...this.state, scanType: id, mode: "scanning" });
  };
  exit = () => {
    Quagga.stop();
    this.setState({ ...this.state, mode: "standby" });
  };
  componentDidCatch(error: Error) {
    this.setState({ ...this.state, mode: "error", error: error });
  }
  render() {
    return (
      <BarcodeScannerBoxUI
        {...this.props}
        updateScanner={this.updateScanner}
        cameraSetup={this.cameraSetup}
        fullscreen={this.fullscreen}
        mode={this.state.mode}
        value={this.state.value}
        start={this.start}
        init={this.init}
        exit={this.exit}
        error={this.state.error}
      />
    );
  }
}

export default BarcodeScannerBox;
