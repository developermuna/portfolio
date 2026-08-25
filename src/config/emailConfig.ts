/**
 * EmailJS Configuration module
 * Reads public configuration from Vite environment variables.
 * Note: VITE_EMAILJS_PUBLIC_KEY is intentionally a client-side public key and safe for browser usage.
 * Never place private keys or SMTP secrets here.
 */

export interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  cooldownSeconds: number;
}

export const emailConfig: EmailConfig = {
  serviceId:
    (import.meta.env.EMAILJS_SERVICE_ID as string) ||
    (import.meta.env.VITE_EMAILJS_SERVICE_ID as string) ||
    '',
  templateId:
    (import.meta.env.EMAILJS_TEMPLATE_ID as string) ||
    (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string) ||
    '',
  publicKey:
    (import.meta.env.EMAILJS_PUBLIC_KEY as string) ||
    (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string) ||
    '',
  cooldownSeconds: 30, // 30 seconds minimum between submissions
};

export const isEmailConfigured = (): boolean => {
  return Boolean(
    emailConfig.serviceId &&
    emailConfig.templateId &&
    emailConfig.publicKey
  );
};
