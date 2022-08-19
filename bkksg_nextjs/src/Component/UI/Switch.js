import React from "react";
import "../../static/css/switch.css";

const Switch = props => {
  const { isChecked, toggleHandler } = props;
  return (
    <div className="switch">
      <input
        type="checkbox"
        className="switch-checkbox"
        checked={isChecked}
        onChange={toggleHandler}
        id="switch-input"
      />
      <label className="switch-label" htmlFor="switch-input">
        <div className="ball" />
      </label>
    </div>
  );
};

export default Switch;
