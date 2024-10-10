import React, { useState } from "react";
import { Editor, EditorProvider } from "react-simple-wysiwyg";

const RichTextEditor = () => {
  const [value, setValue] = useState();

  return (
    <div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
