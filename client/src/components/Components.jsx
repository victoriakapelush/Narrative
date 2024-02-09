/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Toolbar = ({ editor }) => {
  const handleFormat = (format) => {
    // Execute the format command when a toolbar button is clicked
    editor.execCommand(format);
  };

  return (
    <div className="toolbar">
      <button onClick={() => handleFormat('bold')}>Bold</button>
      <button onClick={() => handleFormat('italic')}>Italic</button>
      <button onClick={() => handleFormat('underline')}>Underline</button>
    </div>
  );
};

export default Toolbar;