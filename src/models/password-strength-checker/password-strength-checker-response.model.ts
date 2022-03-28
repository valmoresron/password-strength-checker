export interface PasswordStrengthCheckerResponse {
  score: number;
  guessTimeSeconds: number;
  guessTimeString: string;
  warning: string;
  suggestions: string[];
}
