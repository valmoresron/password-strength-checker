import React, { useState, ChangeEvent } from "react";
import classNames from "classnames";
import "./password-input.scss";

function PasswordInput() {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <input
        id="password"
        className="text-center"
        type={visible ? "text" : "password"}
        placeholder="Type a password"
        onChange={handleInputChange}
      />
      <button
        id="btn-toggle-visibility"
        className={classNames({ "d-none": !value })}
        onClick={toggleVisibility}
      >
        {visible ? "HIDE" : "SHOW"}
      </button>
    </div>
  );
}

export default PasswordInput;
