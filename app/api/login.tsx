"use server";

// import { supabase } from "@/lib/supabase";
import bcrypt from "bcrypt";

// export async function login(request: Request) {
//   const { username, password } = await request.json();
//   const hashedPassword = await bcrypt.hash(password, 0);
//   return NextResponse.json({ username, password: hashedPassword });
// }

export async function hashedPassword(password: string) {
  return bcrypt.hash(password, 0);
}

// client - side hashing is undoable
// this is useless
// refer to https://www.reddit.com/r/Supabase/comments/11bgm4t/user_password_is_revelead_on_login_or_signup/
// fs can't be used in client - side code, so we can't use bcrypt in the server - side code either
// implement supabase MFA 2FA instead