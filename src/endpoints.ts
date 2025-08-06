export const API_FORMS = process.env.API_FORMS || "https://api-forms.tanqory.com";
export const API_STORAGE = process.env.API_STORAGE || "https://api-storage.tanqory.com";
export const API_SITES = process.env.API_SITES || "https://api.tanqory.com";
export const API_AUTH = process.env.API_AUTH || "https://api-auth.tanqory.com";

export const endpoints = {
  API_FORMS,
  API_STORAGE,
  API_SITES,
  API_AUTH,
} as const;
