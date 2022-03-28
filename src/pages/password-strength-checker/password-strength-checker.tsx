import React from "react";
import "./password-strength-checker.scss";

import PasswordInput from "./components/password-input";
import PasswordMeter from "./components/password-meter";

function PasswordStrengthChecker() {
  return (
    <div className="row mt-5">
      <div className="col">
        <div className="d-flex justify-content-center">
          <div>
            <h3 className="text-center">
              <span>Is your password</span>
              <br />
              <span>strong enough?</span>
            </h3>
            <div className="mt-4">
              <div>
                <PasswordInput />
              </div>
              <div className="mt-2">
                <PasswordMeter passwordStrength={0} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordStrengthChecker;
