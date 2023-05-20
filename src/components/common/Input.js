import React, { forwardRef } from "react";
import InputLabel from "./InputLabel";
import InputField from "./InputField";
const Input = forwardRef((props, ref) => {
  return (
    <>
      <InputLabel htmlFor={props.id} label={props.label} />
      <InputField
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        ref={ref}
        placeholder={props.placeholder}
      />
    </>
  );
});

export default Input;
