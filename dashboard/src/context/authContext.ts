import { createContext } from "react";
import { Token, User } from "../interfaces";

interface IAuth {
  user: User | null;
  token: Token | null;
  login: () => Promise<boolean>;
  logout: () => void | boolean;
}

export const AuthContext = createContext<IAuth>({
  user: {
    username: "",
    locale: "",
    mfa_enabled: false,
    flags: 0,
    avatar: "",
    discriminator: "",
    id: "",
  },
  token: {
    accessToken: "",
    iat: 0,
    exp: 1,
    raw: "",
  },
  login: async () => false,
  logout: () => false,
});
