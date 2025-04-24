
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with public URL and anon key
const supabaseUrl = 'https://kgemzehqmlgizepnvlsk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnZW16ZWhxbWxnaXplcG52bHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5OTYyOTIsImV4cCI6MjA1MTU3MjI5Mn0.zeQu-Gh7saqytq4B93PtEh2gpKjKUT4zvD70vovckBw';

// Create a single instance of the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get the current user
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};
