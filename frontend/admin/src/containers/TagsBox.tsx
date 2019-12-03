import React, { Component } from "react";
import { TagsBoxProps, TagsBoxState } from "../interface/Tagsbox.interface";
import TagsBoxUI from "../components/TagsBox";
import { Tag } from "react-tag-input";

export class TagsBox extends Component<TagsBoxProps, TagsBoxState> {
  constructor(props: TagsBoxProps) {
    super(props);
    this.state = {
      tags: this.props.tags ? this.props.tags : []
    };
  }
  handleAdd = (tag: Tag): void => {
    const length: number = this.state.tags.length;
    const lastTag: Tag | undefined = this.state.tags[length - 1];
    let nextID: number = 0;
    if (lastTag !== undefined) nextID = Number(lastTag.id) + 1;
    tag.id = "" + nextID;
    this.setState({ ...this.state, tags: [...this.state.tags, tag] });
  };
  handleDelete = (index: number): void => {
    const tags = this.state.tags;
    this.setState({
      ...this.state,
      tags: tags.filter((cur, i) => i !== index)
    });
  };
  handleDrag = (tag: Tag, indexOfCur: number, indexOfNew: number): void => {
    const tags = this.state.tags;
    const nTags = tags.slice();
    nTags.splice(indexOfCur, 1);
    nTags.splice(indexOfNew, 0, tag);
    this.setState({ ...this.state, tags: nTags });
  };
  render() {
    console.log(this.state.tags);
    return (
      <TagsBoxUI
        {...this.props}
        tags={this.state.tags}
        handleAdd={this.handleAdd}
        handleDelete={this.handleDelete}
        handleDrag={this.handleDrag}
      />
    );
  }
}

export default TagsBox;
