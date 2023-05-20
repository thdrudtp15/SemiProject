import React from "react";

const InputLabel = (props) => {
  return (
    <div className={props.className}>
      <label htmlFor={props.htmlFor}>{props.label}</label>
    </div>
  );
};

export default InputLabel;
