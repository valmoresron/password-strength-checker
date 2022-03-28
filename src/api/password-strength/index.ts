import axios from 'axios';
import { API_URL } from '../../config';
import { PasswordStrengthCheckerPayload } from '../../models/password-strength-checker/password-strength-checker-payload.model';
import { PasswordStrengthCheckerResponse } from '../../models/password-strength-checker/password-strength-checker-response.model';

export async function getPasswordStrength(password: string) {
  const url = `${API_URL}/password/strength`;
  const payload: PasswordStrengthCheckerPayload = { password }
  const response = await axios.post<PasswordStrengthCheckerResponse>(url, payload);
  return response.data;
}