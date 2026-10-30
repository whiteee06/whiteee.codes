import { ContactFormData, FormValidationErrors } from '../types/portfolio';

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  // Standard RFC 5322 compliant regex for web form validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
}

export function validateContactForm(data: ContactFormData): {
  isValid: boolean;
  errors: FormValidationErrors;
} {
  const errors: FormValidationErrors = {};

  const trimmedName = (data.name || '').trim();
  if (!trimmedName) {
    errors.name = 'Please enter your name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters long.';
  } else if (trimmedName.length > 70) {
    errors.name = 'Name cannot exceed 70 characters.';
  }

  const trimmedEmail = (data.email || '').trim();
  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!isValidEmail(trimmedEmail)) {
    errors.email = 'Please enter a valid email address (e.g., name@domain.com).';
  }

  const trimmedMessage = (data.message || '').trim();
  if (!trimmedMessage) {
    errors.message = 'Please provide a brief message.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters long.';
  } else if (trimmedMessage.length > 2000) {
    errors.message = 'Message cannot exceed 2000 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, '').trim();
}

export function createMailtoUrl(
  data: ContactFormData,
  recipient: string = 'nithiarasu248@gmail.com'
): string {
  const subject = 'Portfolio Inquiry - WHITEe.CODES';
  const body = [
    `Visitor Name: ${data.name.trim()}`,
    `Visitor Email: ${data.email.trim()}`,
    `Selected Service: ${data.service?.trim() || 'General Inquiry'}`,
    '',
    'Visitor Message:',
    data.message.trim(),
  ].join('\n');

  return `mailto:${encodeURIComponent(recipient.trim())}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}
