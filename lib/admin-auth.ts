import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Use server-side environment variables only
//const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
//const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "cvats";

//if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
//  throw new Error("Missing admin credentials in environment variables");
//}

export interface AdminSession {
  username: string;
  isAuthenticated: boolean;
  loginTime: number;
}

export async function validateAdminCredentials(
  username: string,
  password: string
): Promise<boolean> {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export async function createAdminSession(username: string): Promise<void> {
  // Bypass for testing
  return;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  // Bypass for testing - return mock session
  return { username: "admin", isAuthenticated: true, loginTime: Date.now() };
}

export async function clearAdminSession(): Promise<void> {
  // Bypass for testing
  return;
}

export async function requireAdminAuth(): Promise<any> {
  // Bypass for testing
  return { username: "admin", isAuthenticated: true, loginTime: Date.now() };
}

export async function isAdminAuthenticated(): Promise<boolean> {
  // Bypass for testing
  return true;
}
