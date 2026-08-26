/**
 * Contact & Social Media Utility Functions
 * Centralizes phone sanitization, WhatsApp click-to-chat link generation,
 * mailto construction, and social platform configurations.
 */

/**
 * Sanitizes a phone number for the official WhatsApp click-to-chat API.
 * Rules:
 * - Format: https://wa.me/COUNTRYCODEPHONENUMBER
 * - No +, spaces, brackets, or dashes
 * - Converts Pakistan local format (e.g., 03419068797) to international 923419068797
 */
export function cleanWhatsAppNumber(phone: string | undefined): string {
  if (!phone) return '923419068797';
  
  // Remove all non-digits
  let digits = phone.replace(/\D/g, '');

  // If local Pakistani format starting with 03 (11 digits: 03XXXXXXXXX)
  if (digits.startsWith('03') && digits.length === 11) {
    digits = '92' + digits.substring(1);
  } else if (digits.startsWith('00')) {
    digits = digits.substring(2);
  } else if (digits.length === 10 && digits.startsWith('3')) {
    digits = '92' + digits;
  }

  return digits || '923419068797';
}

/**
 * Generates an official WhatsApp Click-to-Chat URL
 * Example: https://wa.me/923419068797?text=Hello%20Touseef...
 */
export function getWhatsAppLink(phone: string | undefined, message?: string): string {
  const cleanNumber = cleanWhatsAppNumber(phone);
  if (message && message.trim()) {
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message.trim())}`;
  }
  return `https://wa.me/${cleanNumber}`;
}

/**
 * Formats a phone number for telephone click-to-dial (tel: URI)
 */
export function getTelLink(phone: string | undefined): string {
  if (!phone) return 'tel:+923419068797';
  
  const clean = phone.replace(/[^0-9+]/g, '');
  if (clean.startsWith('03')) {
    return `tel:+92${clean.substring(1)}`;
  }
  if (!clean.startsWith('+')) {
    return `tel:+${clean}`;
  }
  return `tel:${clean}`;
}

/**
 * Formats an email for mailto: URI with optional subject and body
 */
export function getMailtoLink(email: string | undefined, subject?: string, body?: string): string {
  const targetEmail = email || 'saidzaminjc@gmail.com';
  const params = new URLSearchParams();
  if (subject) params.append('subject', subject);
  if (body) params.append('body', body);
  
  const queryString = params.toString();
  return queryString ? `mailto:${targetEmail}?${queryString}` : `mailto:${targetEmail}`;
}

export interface PlatformPreset {
  platform: string;
  defaultUrl: string;
  icon: string;
  placeholder: string;
}

export const SOCIAL_PLATFORM_PRESETS: PlatformPreset[] = [
  {
    platform: 'YouTube',
    defaultUrl: 'https://www.youtube.com/@dakaravines',
    icon: 'youtube',
    placeholder: 'https://www.youtube.com/@channel'
  },
  {
    platform: 'WhatsApp',
    defaultUrl: 'https://wa.me/923419068797',
    icon: 'whatsapp',
    placeholder: 'https://wa.me/923XXXXXXXXX'
  },
  {
    platform: 'LinkedIn',
    defaultUrl: 'https://linkedin.com',
    icon: 'linkedin',
    placeholder: 'https://linkedin.com/in/username'
  },
  {
    platform: 'GitHub',
    defaultUrl: 'https://github.com',
    icon: 'github',
    placeholder: 'https://github.com/username'
  },
  {
    platform: 'X (Twitter)',
    defaultUrl: 'https://twitter.com',
    icon: 'twitter',
    placeholder: 'https://x.com/username'
  },
  {
    platform: 'Instagram',
    defaultUrl: 'https://instagram.com',
    icon: 'instagram',
    placeholder: 'https://instagram.com/username'
  },
  {
    platform: 'Facebook',
    defaultUrl: 'https://facebook.com',
    icon: 'facebook',
    placeholder: 'https://facebook.com/username'
  },
  {
    platform: 'TikTok',
    defaultUrl: 'https://tiktok.com/@',
    icon: 'tiktok',
    placeholder: 'https://tiktok.com/@username'
  },
  {
    platform: 'Telegram',
    defaultUrl: 'https://t.me/',
    icon: 'telegram',
    placeholder: 'https://t.me/username'
  },
  {
    platform: 'Discord',
    defaultUrl: 'https://discord.gg/',
    icon: 'discord',
    placeholder: 'https://discord.gg/invite'
  },
  {
    platform: 'Custom Link',
    defaultUrl: 'https://',
    icon: 'globe',
    placeholder: 'https://yourwebsite.com'
  }
];
