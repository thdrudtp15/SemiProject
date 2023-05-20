import React, { useContext } from "react";
import CheckboxContext from "./CheckboxContext";

function Checkbox({ children, disabled, value, checked, onChange }) {
  const context = useContext(CheckboxContext);

  if (!context) {
    return (
      <div>
        <label>
          <input
            type="checkbox"
            disabled={disabled}
            checked={checked}
            onChange={({ target: { checked } }) => onChange(checked)}
          />
          {children}
        </label>
      </div>
    );
  }

  const { isDisabled, isChecked, toggleValue } = context;

  return (
    <label>
      <input
        type="checkbox"
        disabled={isDisabled(disabled)}
        checked={isChecked(value)}
        onChange={({ target: { checked } }) => toggleValue({ checked, value })}
      />
      {children}
    </label>
  );
}

export default Checkbox;
