export interface FileUploadProps {
  /**
   * @description Limit is in terms of MB
   */
  input?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  limit?: number;
  message: string;
  allowedFileTypes?: string[];
  onFilesSync?: (files: File[]) => void;
  interface?: FileUploadAccess;
}

export interface FileUploadUIProps extends FileUploadProps {
  syncFiles: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FileUploadState {
  files: File[];
  /**
   *  @description Size in terms of MB
   */
  size: number;
  message: string;
}

export interface FileUploadAccess {
  set: (ref: HTMLInputElement) => void;
  toggle: () => void;
  remove: FileUploadRemove;
}

export interface FileUploadRemove {
  set: (index: number) => void;
  get: () => number;
  clear: () => void;
}

export interface FileUploadInputProps {
  files?: File[];
}
