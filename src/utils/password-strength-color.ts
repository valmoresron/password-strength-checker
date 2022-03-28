import PasswordStrength from "./constants/password-strength";

export function getPasswordStrengthColor(passwordStrength: PasswordStrength): string {
  switch (passwordStrength) {
    case PasswordStrength.VeryWeak:
      return '#9A2D28';
    case PasswordStrength.Weak:
      return '#CD3301';
    case PasswordStrength.Medium:
      return '#FF9935';
    case PasswordStrength.Strong:
      return '#22B004';
    case PasswordStrength.VeryStrong:
      return '#1B8F06';  
    default:
      return 'gray';
  }
}