import React from "react";
import "./password-strength-checker.scss";

import PasswordInput from "./components/password-input";
import PasswordMeter from "./components/password-meter";

function PasswordStrengthChecker() {
  return (
    <div className="row mt-5 justify-content-md-center">
      <div className="col-3">
        <div className="d-flex justify-content-center">
          <div>
            <h3 className="text-center">Is your password strong enough?</h3>

            <div className="mt-4">
              <PasswordInput />
            </div>
            <div className="mt-2">
              <PasswordMeter passwordStrength={0} />
            </div>

            <div className="mt-5 text-center">
              <h4>Your password is too weak!</h4>
              <p className="mt-5">
                It will take less than a second to guess your password. This is
                a very common password.
              </p>
              <p>
                <strong>
                  Add another word or two. Uncommon words are better.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordStrengthChecker;
