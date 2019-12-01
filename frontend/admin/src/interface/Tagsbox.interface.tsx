import { Tag } from "react-tag-input";

export interface TagsBoxProps {}

export interface TagsBoxUIProps extends TagsBoxProps {
  tags: Tag[];
  handleDelete: (index: number) => void;
  handleAdd: (tag: Tag) => void;
  handleDrag: (tag: Tag, indexOfCur: number, indexOfNew: number) => void;
}

export interface TagsBoxState {
  tags: Tag[];
}

export interface TagsBoxInputProps {
  tags?: string[];
}
