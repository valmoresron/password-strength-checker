import { PasswordStrength } from "../../utils/constants/password-strength";

export interface PasswordStrengthCheckerResponse {
  score: PasswordStrength;
  guessTimeSeconds: number;
  guessTimeString: string;
  warning?: string;
  suggestions?: string[];
}
