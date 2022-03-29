import React, { useState, useEffect } from "react";
import "./password-meter.scss";
import { times } from "lodash";

import {
  PasswordStrength,
  getPasswordStrengthColor,
} from "../../../../utils/constants/password-strength";

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
        {times(5).map((strength) => (
          <div className="col" key={strength}>
            <Meter color={props.passwordStrength >= strength ? color : defaultColor} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PasswordMeter;
