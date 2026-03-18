import type { SessionOptions } from "iron-session";

export interface SessionUser {
  id: number;
  email: string;
}

export interface SessionData {
  user?: SessionUser;
}

export const sessionOptions: SessionOptions = {
  cookieName: "release-roulette-session",
  password: process.env.SESSION_SECRET ?? "change-me-to-a-secret-of-at-least-32-chars!!",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
};
