// /src/lib/supabase.js

import { createClient } from "@supabase/supabase-js";

// ✅ NO dotenv import
// ✅ NO dotenv.config()
// ✅ Use Vite's import.meta.env instead

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
