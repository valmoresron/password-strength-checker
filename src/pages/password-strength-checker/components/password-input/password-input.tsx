import React from "react";
import "./password-input.scss";

function PasswordInput() {
  return (
    <div>
      <input
        id="password"
        className="text-center"
        type="password"
        placeholder="Type a password"
      />
    </div>
  );
}

export default PasswordInput;
