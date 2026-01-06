

export const BACK_END_URL = import.meta.env.VITE_APP_URL;
export const BACK_END_APP_URL = import.meta.env.VITE_APP_URL ;

// @ts-ignore
export const isDevMode = process.env.NODE_ENV === 'development';
// @ts-ignore
export const isTestMode = import.meta.env.VITE_APP_ENV === "test"

export const DEFAULT_PAGINATION_LIMIT = 50;
