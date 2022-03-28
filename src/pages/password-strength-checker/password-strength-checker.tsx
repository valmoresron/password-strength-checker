import React, { useState, useEffect, useMemo, ChangeEvent } from "react";
import "./password-strength-checker.scss";

import { debounce } from "lodash";

import {
  PasswordStrength,
  getPasswordStrengthDescription,
} from "../../utils/constants/password-strength";
import { apiGetPasswordStrength } from "../../api/password-strength";

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
  const defaultState = useMemo((): State => {
    return {
      passwordStrength: -1,
      passwordDescription: "",
      guessTimeStatement: "",
      suggestions: [],
      warning: "",
    };
  }, []);
  const [state, setState] = useState<State>(defaultState);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!password) {
      setState(defaultState);
      return;
    }

    apiGetPasswordStrength(password).then((response) => {
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
  }, [password, defaultState]);

  const debouncedSetPassword = debounce((password) => {
    setPassword(password);
  }, 500);
  const handlePasswordInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    debouncedSetPassword.cancel();
    debouncedSetPassword(password);
  };

  return (
    <div className="row mt-5 justify-content-md-center">
      <div className="col">
        <div className="d-flex justify-content-center">
          <div id="password-strength-checker-container">
            <h3 className="text-center">
              <span className="d-block">Is your password</span>
              <span className="d-block">strong enough?</span>
            </h3>

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
