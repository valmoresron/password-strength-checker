import React, { useState, useEffect } from "react";
import "./password-meter.scss";

import PasswordStrength from "../../../../utils/constants/password-strength";
import { getPasswordStrengthColor } from "../../../../utils/password-strength-color";

import Meter from "./components/meter";

function PasswordMeter(props: { passwordStrength: PasswordStrength }) {
  const defaultColor = "gray";

  const [color, setColor] = useState(defaultColor);

  useEffect(() => {
    const color = getPasswordStrengthColor(props.passwordStrength);
    setColor(color);
  }, [props]);

  return (
    <div>
      <div className="row gx-1">
        <div className="col">
          <Meter />
        </div>
        <div className="col">
          <Meter />
        </div>
        <div className="col">
          <Meter />
        </div>
        <div className="col">
          <Meter />
        </div>
        <div className="col">
          <Meter />
        </div>
      </div>
    </div>
  );
}

export default PasswordMeter;
