import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "zohra_admin_session";

function getSecret() {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error("ADMIN_PASSWORD environment variable is not set.");
  }
  return secret;
}

function sign(value: string) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken() {
  const timestamp = Date.now().toString();
  return `${timestamp}.${sign(timestamp)}`;
}

function isValidToken(token: string) {
  const [timestamp, signature] = token.split(".");
  if (!timestamp || !signature) return false;
  return sign(timestamp) === signature;
}

export async function isAuthenticated() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return isValidToken(token);
}

export async function setSessionCookie() {
  const store = await cookies();
  store.set(COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export function checkPassword(password: string) {
  return password === getSecret();
}
