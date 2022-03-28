import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import classNames from "classnames";
import "./password-input.scss";

function PasswordInput(props: {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.setSelectionRange(cursor, cursor);
    }
  }, [inputRef, cursor, value, visible]);

  const toggleVisibility = () => {
    setVisible(!visible);
    inputRef.current?.focus();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setCursor(event.target.selectionStart ?? 0);
    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <div>
      <input
        id="password"
        className="text-center"
        type={visible ? "text" : "password"}
        placeholder="Type a password"
        spellCheck="false"
        ref={inputRef}
        autoFocus
        onChange={handleChange}
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
