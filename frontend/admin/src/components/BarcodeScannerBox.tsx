import React from "react";
import {
  BarcodeScannerUIProps,
  BarcodeScannerType
} from "../interface/BarcodeScannerBox.interface";
import Modal from "../components/Modal";
import Alert from "../components/Alert";
import Button from "./Button";
import List from "../containers/List";

function BarcodeScannerBox(props: BarcodeScannerUIProps): JSX.Element {
  const inputBoxEl: JSX.Element = (
    <div className="input-group mb-2">
      <input
        {...(props as React.DetailedHTMLProps<
          React.InputHTMLAttributes<HTMLInputElement>,
          HTMLInputElement
        >)}
        type="text"
        className="form-control"
      />
      <div className="input-group-append" onClick={() => props.start()}>
        <span className="input-group-text">
          <i className="fas fa-eye"></i>
        </span>
      </div>
    </div>
  );
  switch (props.mode) {
    case "standby" || "complete":
      return inputBoxEl;
    case "error":
      return (
        <Modal
          display
          toggle={() => props.exit()}
          title="Unable to scan for barcode!"
          body={
            <Alert
              message={
                props.error
                  ? props.error.message
                  : "There was an error with the barcode scanner."
              }
              theme="danger"
            />
          }
        />
      );
    case "scanning":
      return (
        <Modal
          display
          toggle={() => props.exit()}
          title="Scanning for barcode!"
          body={
            <div className="row">
              <div className="col" ref={ref => props.init(ref)}>
                <div
                  style={{ position: "absolute", right: "2rem", top: "2rem" }}
                >
                  <Button
                    icon="fas fa-compress"
                    value="Fullscreen"
                    color="success"
                    action={() => props.fullscreen()}
                  />
                </div>
                <video
                  className="w-100"
                  width={window.innerWidth}
                  autoPlay
                  preload="auto"
                  src=""
                  ref={ref => props.cameraSetup(ref)}
                />
                <canvas
                  className="drawingBuffer d-none"
                  style={{ position: "absolute", top: 0, left: 0 }}
                ></canvas>
              </div>
            </div>
          }
        />
      );
    case "selecting":
      return (
        <Modal
          display
          toggle={() => props.exit()}
          title="Select Reader Type"
          body={
            <div className="row">
              <div className="col">
                <List
                  items={{
                    elements: [
                      { value: "EAN", id: "ean" },
                      { value: "UPC", id: "upc" },
                      { value: "CODE 128", id: "code_128" },
                      { value: "CODE 39", id: "code_39" },
                      { value: "CODE 93", id: "code_93" },
                      { value: "CODABAR", id: "codabar" },
                      { value: "I2 OF 5", id: "i2of5" }
                    ],
                    actions: [
                      {
                        name: "Select",
                        icon: "fas fa-check-circle",
                        func: id =>
                          props.updateScanner(id as BarcodeScannerType)
                      }
                    ]
                  }}
                />
              </div>
            </div>
          }
        />
      );
    default:
      return inputBoxEl;
  }
}

export default BarcodeScannerBox;
