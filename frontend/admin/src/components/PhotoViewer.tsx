import React from "react";
import "./css/PhotoViewer.css";
import { PhotoViewerUIProps } from "../interface/PhotoViewer.interface";
import { Manager, Reference, Popper } from "react-popper";
import Popover from "./Popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function PhotoViewer(props: PhotoViewerUIProps) {
  function PhotoHeight(): string {
    switch (true) {
      case window.innerWidth >= 1200:
        return "15.625rem";
      case window.innerWidth >= 992:
        return "12.5rem";
      case window.innerHeight >= 768:
        return "12.5rem";
      case window.innerHeight < 768:
        return "9.365rem";
      default:
        return "15.625rem";
    }
  }
  return (
    <div className="row mb-4 mt-2">
      {props.add && (
        <div
          className="col-sm-12 col-md-6 col-lg-4"
          onClick={() => props.add!()}
        >
          <div
            className="col-12 border border-success"
            style={{ height: PhotoHeight() }}
          >
            <i
              className={
                "fas fa-plus-circle fa-2x fa-fw photo-viewer-button text-success"
              }
            ></i>
          </div>
        </div>
      )}
      {props.photos.map((photo, index) => (
        <Manager>
          <Reference>
            {({ ref }) => (
              <div
                className="col-sm-12 col-md-6 col-lg-4 text-center"
                ref={ref}
                onClick={e => (props.remove ? props.remove(index) : "")}
              >
                <div className="bg-dark mb-2">
                  <img
                    ref={ref => props.select.set(ref, index)}
                    key={index}
                    src={photo.src}
                    className="photo-viewer col-12 w-100"
                    style={{ height: PhotoHeight(), backgroundColor: "black" }}
                    onMouseEnter={e => props.select.toggle(index)}
                    onMouseMove={e => props.select.zoom(e, index)}
                    onMouseLeave={e => props.select.clear()}
                  />
                  {props.select.selected === index && props.remove && (
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="photo-viewer-button"
                      color={"red"}
                    />
                  )}
                </div>
              </div>
            )}
          </Reference>
          <Popper placement="auto-end">
            {popperProps =>
              props.select.selected === index && (
                <Popover
                  popper={popperProps}
                  body={
                    <div className="row">
                      <div
                        className="col-12"
                        style={{
                          overflow: "hidden",
                          position: "relative",
                          height: "300px"
                        }}
                      >
                        <div
                          style={{ height: photo.height, width: photo.width }}
                        ></div>
                        <img
                          style={{
                            height: photo.height,
                            width: photo.width,
                            position: "absolute",
                            left:
                              (-1 * props.select.xPercent * photo.width) / 100,
                            top:
                              (-1 * props.select.yPercent * photo.height) / 100
                          }}
                          src={photo.src}
                          key={index}
                        />
                      </div>
                    </div>
                  }
                />
              )
            }
          </Popper>
        </Manager>
      ))}
    </div>
  );
}

export default PhotoViewer;
