export const capitalize = (str: string): string => {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toLowercase = (str: string): string => {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }

  return str.toLowerCase();
};

export const toUppercase = (str: string): string => {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }

  return str.toUpperCase();
};

export const trim = (str: string): string => {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }

  return str.trim();
};

export const truncate = (str: string, maxLength: number): string => {
  if (typeof str !== 'string' || typeof maxLength !== 'number') {
    throw new Error('Input must be a string and a number');
  }

  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
};

export const escapeHTML = (str: string): string => {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }

  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

export const unescapeHTML = (str: string): string => {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }

  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
};

export const slugify = (str: string): string => {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }

  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

export const isEmail = (str: string): boolean => {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
};

export const isURL = (str: string): boolean => {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }

  return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\\+,;=.]+$/.test(
    str
  );
};

export const isPhoneNumber = (str: string): boolean => {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }

  return /^[+][(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]$/g.test(str);
};