export const enum PasswordStrength {
  VeryWeak,
  Weak,
  Medium,
  Strong,
  VeryStrong,
}

const passwordStrengthColors: string[] = [
  "#9A2D28",
  "#CD3301",
  "#FF9935",
  "#22B004",
  "#1B8F06",
];

const passwordStrengthDescriptions: string[] = [
  "too weak",
  "weak",
  "okay",
  "strong",
  "very strong",
];

export function getPasswordStrengthColor(passwordStrength: PasswordStrength) {
  return passwordStrengthColors[passwordStrength];
}

export function getPasswordStrengthDescription(passwordStrength: PasswordStrength) {
  return passwordStrengthDescriptions[passwordStrength];
}
