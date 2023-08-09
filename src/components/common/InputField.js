import React, { forwardRef } from "react";

const InputField = forwardRef((props, ref) => {
  return props.type === "textarea" ? (
    <textarea
      ref={ref}
      id={props.id}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  ) : (
    <input
      ref={ref}
      type={props.type}
      id={props.id}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  );
});

export default InputField;
