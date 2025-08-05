// lib/supabase/server.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // <-- PASTIKAN INI ANON KEY
    {
      cookies: {
        async get(name: string) {
          return await cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            console.warn("Failed to set cookie:", (error as Error).message);
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            console.warn("Failed to remove cookie:", (error as Error).message);
          }
        },
      },
    }
  );
}

export async function createSupabaseAdminClient() {
  const cookieStore = await cookies(); // Masih perlu cookieStore untuk respon
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // <-- PASTIKAN INI SERVICE ROLE KEY
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            console.warn(
              "Failed to set cookie in admin client:",
              (error as Error).message
            );
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            console.warn(
              "Failed to remove cookie in admin client:",
              (error as Error).message
            );
          }
        },
      },
    }
  );
}
