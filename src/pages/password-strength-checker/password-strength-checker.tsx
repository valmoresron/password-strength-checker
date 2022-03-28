import React, { useState, useEffect, useMemo, ChangeEvent } from "react";
import "./password-strength-checker.scss";

import { debounce } from "lodash";
import classNames from "classnames";

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
  const [isFetching, setIsFetching] = useState(false);

  const debouncedSetPassword = debounce((password) => {
    setPassword(password);
  }, 500);

  useEffect(() => {
    if (!password) {
      setState(defaultState);
      return;
    }

    setIsFetching(true);
    apiGetPasswordStrength(password).then((response) => {
      const passwordStrength = response.score;
      const suggestions = response.suggestions ?? [];
      const warning = response.warning ?? "";
      const description = getPasswordStrengthDescription(passwordStrength);
      const punctuation = passwordStrength >= PasswordStrength.Medium ? "." : "!";
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
      setIsFetching(false);
    });
  }, [password, defaultState]);

  const handlePasswordInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    debouncedSetPassword.cancel();
    if (!password) {
      setPassword(password);
    } else {
      debouncedSetPassword(password);
    }
  };

  return (
    <div id="page-container" className="row justify-content-md-center">
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
              <PasswordMeter passwordStrength={password ? state.passwordStrength : -1} />
            </div>

            <div className={classNames("mt-5", "text-center", {"d-none": !password})}>
              <h4 className="placeholder-glow">
                <span className={classNames({ "d-none": isFetching })}>
                  {state.passwordDescription}
                </span>
                <span className={classNames("placeholder", "col-9", { "d-none": !isFetching })}></span>
              </h4>
              <p className="mt-4 placeholder-glow">
                <span className={classNames({ "d-none": isFetching })}>
                  <span>{state.guessTimeStatement} </span>
                  <span>{state.warning}</span>
                </span>
                <span className={classNames({ "d-none": !isFetching })}>
                  <span className="placeholder col-10"></span>
                  <span className="placeholder col-8"></span>
                </span>
              </p>
              <p className="mt-4 placeholder-glow">
                <strong className={classNames({ "d-none": isFetching })}>
                  {state.suggestions.map((suggestion, i) => (
                    <span className="d-block" key={i}>
                      {suggestion}
                    </span>
                  ))}
                </strong>
                <span className={classNames({ "d-none": !isFetching })}>
                  <strong className="placeholder col-9"></strong>
                  <strong className="placeholder col-5"></strong>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordStrengthChecker;
