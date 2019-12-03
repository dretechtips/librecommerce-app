import React, { Component } from "react";
import {
  PhotoUploadProps,
  PhotoUploadState
} from "../interface/PhotoUpload.interface";
import PhotoUploadUI from "../components/PhotoUpload";

export class PhotoUpload extends Component<PhotoUploadProps, PhotoUploadState> {
  fileUploadElement: HTMLInputElement | null;
  constructor(props: PhotoUploadProps) {
    super(props);
    this.state = {
      photos: this.props.photos ? this.props.photos : [],
      size: 0,
      remove: -1
    };
    this.fileUploadElement = null;
  }
  readPhotosFile = (files: File[]) => {
    const photos: File[] = files;
    this.setState({
      ...this.state,
      size: photos.reduce((a, b) => a + b.size, 0)
    });
    photos.forEach(cur => {
      const scanner = new FileReader();
      scanner.onload = this.filesToPhoto;
      scanner.readAsDataURL(cur.slice(0, cur.size));
    });
  };
  filesToPhoto = (e: ProgressEvent<FileReader>) => {
    if (!e.target) return;
    if (typeof e.target!.result === "string") {
      if (
        this.state.photos.find(cur => cur.src === e.target!.result) ===
        undefined
      ) {
        const photo: HTMLImageElement = new Image();
        photo.src = e.target.result;
        this.state.photos.unshift(photo);
      }
      this.setState({
        ...this.state,
        size: this.state.size + (e.target.result.length * 2) / 1000000
      });
    }
  };
  setFileUpload = (ref: HTMLInputElement) => {
    this.fileUploadElement = ref;
  };
  toggleFileUpload = () => {
    if (!this.fileUploadElement) return;
    else this.fileUploadElement.click();
  };
  setRemoved = (index: number) => {
    this.state.photos.splice(index, 1);
    this.setState({ ...this.state, remove: index });
  };
  getRemoved = () => this.state.remove;
  clearRemoved = () => this.setState({ ...this.state, remove: -1 });
  render() {
    return (
      <PhotoUploadUI
        {...this.props}
        photos={this.state.photos}
        setPhotos={this.readPhotosFile}
        fileUpload={{
          set: this.setFileUpload,
          toggle: this.toggleFileUpload,
          remove: {
            set: this.setRemoved,
            clear: this.clearRemoved,
            get: this.getRemoved
          }
        }}
      />
    );
  }
}

export default PhotoUpload;
