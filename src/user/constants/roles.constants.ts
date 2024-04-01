export const ROLES = {
  ADMID: 'ADMIN',
  USER: 'USER',
} as const;

export type TROLES = (typeof ROLES)[keyof typeof ROLES];
