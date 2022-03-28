import React, { useState, ChangeEvent } from "react";
import classNames from "classnames";
import "./password-input.scss";

function PasswordInput(props: { onChange?: (e: ChangeEvent<HTMLInputElement>) => void }) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <input
        id="password"
        className="text-center"
        type={visible ? "text" : "password"}
        placeholder="Type a password"
        onChange={props.onChange}
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
