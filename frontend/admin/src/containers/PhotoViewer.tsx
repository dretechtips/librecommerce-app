import React, { Component } from 'react'
import PhotoViewerUI from "../components/PhotoViewer";
import { PhotoViewerProps, PhotoViewerState } from '../interface/PhotoViewer.interface';

export class PhotoViewer extends Component<PhotoViewerProps, PhotoViewerState> {
  constructor(props: PhotoViewerProps) {
    super(props);
    this.state = {
      selected: {
        index: -1,
        xPercent: 0,
        yPercent: 0,
      },
      imageRects: this
      .props
      .photos
      .map(cur => cur.getBoundingClientRect()),
      lastScrollTime: null,
    }
  }
  componentWillReceiveProps(nextProps: PhotoViewerProps) {
    this.setState({...this.state, imageRects: nextProps.photos.map(cur => null)});
  }
  setPhotosRect = (image: HTMLImageElement | null, index: number) => {
    if(image) {
      this.state.imageRects[index] = image.getBoundingClientRect();
    }
  }
  displaySelected = (index: number) => {
    this.setState({...this.state, selected: {...this.state.selected, index}});
  }
  clearSelected = () => {
    this.setState({...this.state, selected: {...this.state.selected, index: -1}});
  }
  zoomSelected = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, index: number) => {
    console.log(this.state.lastScrollTime);
    if(this.state.lastScrollTime && new Date().getTime() < this.state.lastScrollTime + 500) {
      console.log("Scrolling");
      return;
    }
    const rect: ClientRect | DOMRect | null = this.state.imageRects[index];
    if(rect) {
      const offsetX: number = e.clientX - rect.left;
      const offsetY: number = e.clientY - rect.top;
      this.setState({...this.state, 
        selected: {...this.state.selected, 
          xPercent:  (offsetX / rect.width) * 100, 
          yPercent: (offsetY / rect.height) * 100}});
    }
  }
  render() {
    return (
      <div>
        <PhotoViewerUI 
        remove={this.props.remove}
        add={this.props.add}
        photos={this.props.photos}
        select={{
          clear: this.clearSelected,
          toggle: this.displaySelected,
          selected: this.state.selected.index,
          zoom: this.zoomSelected,
          set: this.setPhotosRect,
          xPercent: this.state.selected.xPercent,
          yPercent: this.state.selected.yPercent
        }}
         />
      </div>
    )
  }
}

export default PhotoViewer
