import React, { useState, useEffect, useMemo, ChangeEvent } from "react";
import "./password-strength-checker.scss";
import "react-toastify/dist/ReactToastify.css";

import { debounce } from "lodash";
import { toast, ToastOptions } from "react-toastify";
import classNames from "classnames";

import {
  PasswordStrength,
  getPasswordStrengthDescription,
} from "../../utils/constants/password-strength";
import { ToastContainer } from "react-toastify";
import { apiGetPasswordStrength } from "../../api/password-strength";

import PasswordInput from "./components/password-input";
import PasswordMeter from "./components/password-meter";
import Footer from "./components/footer";

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
  const [hasError, setHasError] = useState(false);
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
    setHasError(false);
    apiGetPasswordStrength(password)
      .then((response) => {
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
      })
      .catch(() => {
        const toastOptions: ToastOptions = {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          draggable: false,
        };
        const toastMessage = "❗Unable to process the request";

        setState(defaultState);
        setHasError(true);
        toast(toastMessage, toastOptions);
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
    <div id="page-container" className="row">
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
              <PasswordMeter passwordStrength={password && !hasError ? state.passwordStrength : -1} />
            </div>

            <div className={classNames("mt-5", "text-center", {"d-none": !password || hasError})}>
              <Footer
                loading={isFetching}
                passwordDescription={state.passwordDescription}
                guessTimeStatement={state.guessTimeStatement}
                suggestions={state.suggestions}
                warning={state.warning}
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default PasswordStrengthChecker;
