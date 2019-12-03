import { FileUploadAccess } from "./FileUpload.interface";

export interface PhotoUploadProps {
  input?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  photos?: HTMLImageElement[];
  photoLimit?: number;
  /** @description In terms of MB */
  sizeLimit?: number;
}

export interface PhotoUploadUIProps extends PhotoUploadProps {
  photos: HTMLImageElement[];
  setPhotos: (files: File[]) => void;
  fileUpload: FileUploadAccess;
}

export interface PhotoUploadState {
  photos: HTMLImageElement[];
  size: number;
  remove: number;
}

export interface PhotoUploadInputProps {
  photos?: HTMLImageElement[];
}
