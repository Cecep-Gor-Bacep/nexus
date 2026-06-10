import { createClient } from '@supabase/supabase-js';

// Mengambil URL dan Key dari file .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabasePublishKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

// Mengekspor client agar dikenali oleh komponen Login Anda
export const supabase = createClient(supabaseUrl, supabasePublishKey);