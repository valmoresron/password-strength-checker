import React from "react";
import "./password-meter.scss";

import Meter from "./components/meter";

function PasswordMeter() {
  return (
    <div id="password-meter-container">
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
