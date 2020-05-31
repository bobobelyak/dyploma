import React from 'react';
import ReactQuill from 'react-quill';

const modules = {
  toolbar: [
    [{header: [1, 2, 3, 4, false]}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
    [{color: []}],
  ],
};

const TextEditor = props => {
  const {input} = props;

  return (
    <ReactQuill
      style={{padding: '18.5px 0', height: 500}}
      value={input.value}
      onChange={input.onChange}
      modules={modules}
    />
  );
};

export default TextEditor;
