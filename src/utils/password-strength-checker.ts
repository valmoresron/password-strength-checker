import { PasswordStrengthCheckerResponse } from "../models/password-strength-checker/password-strength-checker-response.model";
import { getPasswordStrengthDescription, PasswordStrength } from "./constants/password-strength";

export interface State {
  passwordStrength: PasswordStrength;
  passwordDescription: string;
  guessTimeStatement: string;
  suggestions: string[];
  warning: string;
}

export const initialState: State = {
  passwordStrength: -1,
  passwordDescription: "",
  guessTimeStatement: "",
  suggestions: [],
  warning: "",
};

export function PSCResponseToState(response: PasswordStrengthCheckerResponse): State {
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

  return newState;
}
