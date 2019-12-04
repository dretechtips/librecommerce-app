import React from "react";
import {
  PasswordInputUIProps,
  InvalidState
} from "../interface/PasswordInput.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faKey } from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";

function PasswordInput(props: PasswordInputUIProps) {
  return <Input<typeof InvalidState> {...props} />;
  // const valid = props.validityStates;
  // return (
  //   <div>
  //     <div className="input-group">
  //       <input
  //         className={
  //           "form-control " +
  //           (props.validityStates === true ? "is-valid " : "is-invalid ")
  //         }
  //         type="text"
  //         onChange={props.validation}
  //         onFocus={props.displayHelp}
  //         onBlur={props.undisplayHelp}
  //         value={props.password}
  //         spellCheck={false}
  //       />
  //       <div className="input-group-append">
  //         <button className="input-group-text" onClick={props.generatePassword}>
  //           <FontAwesomeIcon icon={faKey} fixedWidth />
  //         </button>
  //       </div>
  //     </div>
  //     {props.help ? (
  //       valid === true ? (
  //         <span className="text-success">
  //           <FontAwesomeIcon icon={faCheck} fixedWidth />
  //           {"Password has been approved by the client."}
  //         </span>
  //       ) : (
  //         <div className="text-sm">
  //           {(valid as InvalidityState[]).indexOf(InvalidityState.tooShort) !==
  //           -1 ? (
  //             <span className="text-danger">
  //               <FontAwesomeIcon icon={faTimes} fixedWidth />
  //               {`Password length is smaller than ${props.min}.`}
  //             </span>
  //           ) : (
  //             <span className="text-success">
  //               <FontAwesomeIcon icon={faCheck} fixedWidth />
  //               {`Password length is greater than ${props.min}.`}
  //             </span>
  //           )}
  //           <br />
  //           {(valid as InvalidityState[]).indexOf(InvalidityState.tooLong) !==
  //           -1 ? (
  //             <span className="text-danger">
  //               <FontAwesomeIcon icon={faTimes} fixedWidth />
  //               {`Password length is greater than ${props.max}.`}
  //             </span>
  //           ) : (
  //             <span className="text-success">
  //               <FontAwesomeIcon icon={faCheck} fixedWidth />
  //               {`Password length is less than ${props.max}.`}
  //             </span>
  //           )}
  //           <br />
  //           {(valid as InvalidityState[]).indexOf(
  //             InvalidityState.noCapitalLetter
  //           ) !== -1 ? (
  //             <span className="text-danger">
  //               <FontAwesomeIcon icon={faTimes} fixedWidth />
  //               {`Password has no capital letter.`}
  //             </span>
  //           ) : (
  //             <span className="text-success">
  //               <FontAwesomeIcon icon={faCheck} fixedWidth />
  //               {`Password has at least one capital letter.`}
  //             </span>
  //           )}
  //           <br />
  //           {(valid as InvalidityState[]).indexOf(
  //             InvalidityState.noSpecialChar
  //           ) !== -1 ? (
  //             <span className="text-danger">
  //               <FontAwesomeIcon icon={faTimes} fixedWidth />
  //               {`Password has no special character`}
  //             </span>
  //           ) : (
  //             <span className="text-success">
  //               <FontAwesomeIcon icon={faCheck} fixedWidth />
  //               {`Password has at least one special character.`}
  //             </span>
  //           )}
  //           <br />
  //         </div>
  //       )
  //     ) : (
  //       ""
  //     )}
  //   </div>
  // );
}

export default PasswordInput;
