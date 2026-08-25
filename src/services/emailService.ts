import emailjs from '@emailjs/browser';
import { emailConfig, isEmailConfigured } from '../config/emailConfig';

const COOLDOWN_KEY = 'portfolio_contact_last_submit';

export interface FormValidationResult {
  isValid: boolean;
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
}

export interface SendEmailResult {
  success: boolean;
  message: string;
  cooldownRemaining?: number;
}

/**
 * Validate input fields client-side before touching the network or EmailJS.
 */
export const validateContactInput = (
  name: string,
  email: string,
  message: string
): FormValidationResult => {
  const errors: FormValidationResult['errors'] = {};
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  // Name validation
  if (!trimmedName) {
    errors.name = 'Please enter your name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters long.';
  } else if (trimmedName.length > 100) {
    errors.name = 'Name must not exceed 100 characters.';
  }

  // Email validation (standard RFC 5322 compatible regex)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (trimmedEmail.length > 254) {
    errors.email = 'Email address is too long.';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  // Message validation
  if (!trimmedMessage) {
    errors.message = 'Please enter a message.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters long.';
  } else if (trimmedMessage.length > 3000) {
    errors.message = 'Message must not exceed 3000 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Check if the user is currently under a submission cooldown.
 */
export const getCooldownRemaining = (): number => {
  try {
    const lastSubmit = sessionStorage.getItem(COOLDOWN_KEY);
    if (!lastSubmit) return 0;
    
    const elapsedSeconds = (Date.now() - parseInt(lastSubmit, 10)) / 1000;
    const remaining = Math.ceil(emailConfig.cooldownSeconds - elapsedSeconds);
    return remaining > 0 ? remaining : 0;
  } catch {
    return 0;
  }
};

/**
 * Record the submission timestamp for client-side cooldown.
 */
export const recordSubmissionTimestamp = (): void => {
  try {
    sessionStorage.setItem(COOLDOWN_KEY, Date.now().toString());
  } catch {
    // Ignore sessionStorage errors in restricted environments
  }
};

/**
 * Send contact form data via EmailJS with full defense-in-depth protection.
 */
export const sendContactForm = async (
  formElement: HTMLFormElement
): Promise<SendEmailResult> => {
  // 1. Honeypot check (hidden bot field named 'website')
  const formData = new FormData(formElement);
  const honeypot = (formData.get('website') as string) || '';
  if (honeypot.trim().length > 0) {
    // Silent rejection for automated bot submissions (pretend success to deceive bots)
    if (import.meta.env.DEV) {
      console.warn('[EmailService] Bot honeypot triggered. Request dropped.');
    }
    return {
      success: true,
      message: "Message sent successfully. I'll get back to you soon.",
    };
  }

  // 2. Cooldown check
  const cooldownRemaining = getCooldownRemaining();
  if (cooldownRemaining > 0) {
    return {
      success: false,
      message: `Please wait ${cooldownRemaining}s before sending another message.`,
      cooldownRemaining,
    };
  }

  // 3. Extract & validate values
  const name = (formData.get('user_name') as string) || '';
  const email = (formData.get('user_email') as string) || '';
  const message = (formData.get('message') as string) || '';

  const validation = validateContactInput(name, email, message);
  if (!validation.isValid) {
    const firstError = Object.values(validation.errors)[0] || 'Please fill in all required fields correctly.';
    return {
      success: false,
      message: firstError,
    };
  }

  // 4. Ensure EmailJS environment keys are configured
  if (!isEmailConfigured()) {
    if (import.meta.env.DEV) {
      console.error(
        '[EmailService] EmailJS is not configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file.'
      );
    }
    return {
      success: false,
      message: 'Email service is currently being configured. Please reach out directly via email.',
    };
  }

  // 5. Send via official EmailJS sendForm SDK
  try {
    const response = await emailjs.sendForm(
      emailConfig.serviceId,
      emailConfig.templateId,
      formElement,
      {
        publicKey: emailConfig.publicKey,
      }
    );

    if (response.status === 200 || response.text === 'OK') {
      recordSubmissionTimestamp();
      return {
        success: true,
        message: "Message sent successfully. I'll get back to you soon!",
      };
    }

    throw new Error(`EmailJS responded with status: ${response.status}`);
  } catch (error: unknown) {
    if (import.meta.env.DEV) {
      console.error('[EmailService] Failed to send email via EmailJS:', error);
    }
    return {
      success: false,
      message: 'Unable to send your message right now. Please try again later or email me directly.',
    };
  }
};
