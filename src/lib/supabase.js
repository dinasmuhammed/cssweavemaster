import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://kgemzehqmlgizepnvlsk.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnZW16ZWhxbWxnaXplcG52bHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5OTYyOTIsImV4cCI6MjA1MTU3MjI5Mn0.zeQu-Gh7saqytq4B93PtEh2gpKjKUT4zvD70vovckBw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);