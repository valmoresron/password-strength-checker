import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import "./password-strength-checker.scss";
import "react-toastify/dist/ReactToastify.css";

import { debounce } from "lodash";
import { toast, ToastOptions } from "react-toastify";
import classNames from "classnames";

import { ToastContainer } from "react-toastify";
import { apiGetPasswordStrength } from "../../api/password-strength";
import { initialState, PSCResponseToState } from "../../utils/password-strength-checker";

import PasswordInput from "./components/password-input";
import PasswordMeter from "./components/password-meter";
import Footer from "./components/footer";

function PasswordStrengthChecker() {
  const defaultState = initialState;
  const [state, setState] = useState(defaultState);

  const [hasError, setHasError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [password, setPassword] = useState("");
  const debouncedSetPassword = debounce((password) => { setPassword(password); }, 500);

  const handlePasswordInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    debouncedSetPassword.cancel();
    !password ? setPassword(password) : debouncedSetPassword(password);
  };

  const showToastError = useCallback(() => {
    const toastOptions: ToastOptions = {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: true,
      draggable: false,
    };
    const toastMessage = "❗Unable to process the request";
    toast(toastMessage, toastOptions);
  }, []);

  useEffect(() => {
    if (!password) {
      setState(defaultState);
      return;
    }

    setIsFetching(true);
    setHasError(false);

    apiGetPasswordStrength(password)
      .then((response) => {
        setState(PSCResponseToState(response));
        setIsFetching(false);
      })
      .catch(() => {
        setState(defaultState);
        setHasError(true);
        showToastError();
      });
  }, [password, defaultState, showToastError]);

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
