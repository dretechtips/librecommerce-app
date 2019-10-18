import React from 'react';
import { BarcodeScannerUIProps } from "../interface/BarcodeScannerBox.interface";
import Modal from '../components/Modal';
import Alert from '../components/Alert';

function BarcodeScannerBox(props: BarcodeScannerUIProps): JSX.Element {
  const inputBoxEl: JSX.Element = (
    <div className="input-group mb-2">
      <input type="text" className="form-control" defaultValue={props.value}/>
      <div className="input-group-append" onClick={() => props.start() }>
        <span className="input-group-text">
          <i className="fas fa-barcode"></i>
        </span>
      </div>
    </div>
  );
  switch(props.mode) {
    case "standby" || "complete":
      return inputBoxEl;
    case "error":
        return <Modal 
        display
        toggle={() => props.exit()}
        title="Unable to scan for barcode!"
        body={(<Alert 
          message={props.error ? props.error.message : "There was an error with the barcode scanner."}
          theme="danger" />)}
        footer={[]}/>
    case "scanning":
      return <Modal 
        display
        toggle={() => props.exit()}
        title="Scanning for barcode!"
        body={(
          <div className="row">
            <div className="col" ref={(ref) => props.init(ref)}>
              <canvas className="w-100" width={window.innerWidth} height={window.innerHeight} style={{position: "absolute"}} />
              <video className="w-100" width={window.innerWidth} height={window.innerHeight} autoPlay preload="auto" src="" />
            </div>
          </div>
        )}
        footer={[]}/>;
    default:
      return inputBoxEl;
  }
}

export default BarcodeScannerBox
