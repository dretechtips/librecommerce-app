import React, { Component } from 'react'
import { FileUploadProps, FileUploadState } from '../interface/FileUpload.interface'
import FileUploadUI from "../components/FileUpload";

export class FileUpload extends Component<FileUploadProps, FileUploadState> {
  constructor(props: FileUploadProps) {
    super(props);
    this.state = {
      files: [],
      message: this.props.message,
      size: 0,
    }
  }
  syncFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files)
      return;
    if(this.props.allowedFileTypes && !this.props.allowedFileTypes.find(cur => cur === e.target.files![0].type)) {
      this.componentDidCatch(new Error("Cannot accept this file type!"));
      return;
    }
    let files: File[] = new Array<File | null>(e.target.files.length)
    .fill(null)
    .map((cur, index) => e.target.files![index])
    .concat(this.state.files)
    .filter((cur, index, self) => index === self.findIndex(x => x.name === cur.name));
    this.setState({...this.state, 
      files: files, 
      size: files
      .reduce((a, b) => a + b.size, files[0].size ? files[0].size : 0)});
    if(this.props.onFilesSync)
      this.props.onFilesSync(files);
    e.target.type = "text";
    e.target.type = "file";
  }
  
  generateMessage = (): string => {
    let message = "";
    this.state.files.forEach(cur => message += cur.name + `[${cur.size / 1000000}MB], `);
    if(message === "")
      return "It seems like no file has been inputted. Please try again.";
    else
      return message;
  }
  componentWillUpdate(nextProps: FileUploadProps, nextState: FileUploadState) {
    if(nextState.size > (this.props.limit ? this.props.limit : Number.MAX_VALUE)) {
      this.componentDidCatch(new Error("The uploaded file size to large!"));
    }
  }
  componentDidUpdate(prevProps: FileUploadProps, prevState: FileUploadState) {
    if(this.state.message !== this.generateMessage())
      this.setState({...this.state, message: this.generateMessage()});
    if(this.props.interface)
      if(this.props.interface.remove.get() !== -1) {
        this.state.files.splice(this.props.interface.remove.get(), 1);
        this.setState({...this.state});
        this.props.interface.remove.clear();
      }
  }
  componentDidCatch(e: Error) {
    this.state.files.pop();
    this.setState({...this.state, 
      size: this
      .state
      .files
      .reduce<number>((a, b) => a + b.size, 0), 
      message: this.generateMessage()});
    if(this.props.onFilesSync)
      this.props.onFilesSync(this.state.files);
    alert(e.message);
  }
  render() {
    return (
      <FileUploadUI {...this.props} 
      message={this.state.message}
      syncFiles={this.syncFiles}/>
    )
  }
}

export default FileUpload
