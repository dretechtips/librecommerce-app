import React from 'react'
import FileUpload from '../containers/FileUpload'
import { PhotoUploadUIProps } from '../interface/PhotoUpload.interface'
import PhotoViewer from '../containers/PhotoViewer'


function PhotoUpload(props: PhotoUploadUIProps) {
  return (
    <div>
      <PhotoViewer photos={props.photos} add={props.fileUpload.toggle} remove={props.fileUpload.remove.set}/>
      <FileUpload 
      message="Please upload pictures" 
      allowedFileTypes={["image/png", "image/jpeg", "image/gif", "image/tiff", "image/bmp"]} 
      onFilesSync={props.setPhotos}
      interface={props.fileUpload}/>
    </div>
  )
}

export default PhotoUpload
