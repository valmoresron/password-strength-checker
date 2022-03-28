import React, { useState, useEffect, ChangeEvent } from "react";
import "./password-strength-checker.scss";

import {
  PasswordStrength,
  getPasswordStrengthDescription,
} from "../../utils/constants/password-strength";
import { getPasswordStrength } from "../../api/password-strength";

import PasswordInput from "./components/password-input";
import PasswordMeter from "./components/password-meter";

interface State {
  passwordStrength: PasswordStrength;
  passwordDescription: string;
  guessTimeStatement: string;
  suggestions: string[];
  warning: string;
}

function PasswordStrengthChecker() {
  const defaultState: State = {
    passwordStrength: -1,
    passwordDescription: "",
    guessTimeStatement: "",
    suggestions: [],
    warning: "",
  };
  const [state, setState] = useState<State>(defaultState);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!password) {
      setState(defaultState);
      return;
    }

    getPasswordStrength(password).then((response) => {
      const passwordStrength = response.score;
      const suggestions = response.suggestions ?? [];
      const warning = response.warning ?? "";
      const description = getPasswordStrengthDescription(passwordStrength);
      const punctuation =
        passwordStrength >= PasswordStrength.Medium ? "." : "!";
      const passwordDescription = `Your password is ${description}${punctuation}`;
      const guessTimeStatement = `It will take ${response.guessTimeString} to guess your password.`;

      const newState: State = {
        passwordStrength,
        suggestions,
        warning,
        passwordDescription,
        guessTimeStatement,
      };
      setState(newState);
    });
  }, [password]);

  const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="row mt-5 justify-content-md-center">
      <div className="col">
        <div className="d-flex justify-content-center">
          <div id="password-strength-checker-container">
            <h3 className="text-center">Is your password strong enough?</h3>

            <div className="mt-4">
              <PasswordInput onChange={handlePasswordInputChange} />
            </div>
            <div className="mt-2">
              <PasswordMeter passwordStrength={state.passwordStrength} />
            </div>

            <div className="mt-5 text-center">
              <h4>{state.passwordDescription}</h4>
              <p className="mt-5">
                <span>{state.guessTimeStatement} </span>
                <span>{state.warning}</span>
              </p>
              <p>
                <strong>
                  {state.suggestions.map((suggestion, i) => (
                    <span className="d-block" key={i}>
                      {suggestion}
                    </span>
                  ))}
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
