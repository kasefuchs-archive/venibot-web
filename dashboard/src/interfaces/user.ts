export interface User {
  username: string;
  locale: string;
  mfa_enabled: boolean;
  flags: number;
  avatar: string;
  discriminator: string;
  id: string;
}
