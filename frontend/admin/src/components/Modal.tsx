import React, { Component, RefObject } from 'react'
import { ModalProps } from '../interface/Modal.interface'

function Modal(props: ModalProps) {
  return (
    <div 
    className={"modal fade " + (props.display ? "show " : "")} 
    style={{display: props.display ? "block" : "none"}}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
            <button type="button" className="close" aria-label="Close" onClick={() => props.toggle()}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" style={{maxHeight: "80%", overflowY: "auto"}}>
            {props.body}
          </div>
          {props.footer && 
          <div className="modal-footer">
            {props.footer}
          </div>}
        </div>
      </div>
    </div>
  )
}

export default Modal
