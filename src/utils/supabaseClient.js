
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with public URL and anon key
const supabaseUrl = 'https://aibpalskveawzdqyjwaq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpYnBhbHNrdmVhd3pkcXlqd2FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5MDkxMzksImV4cCI6MjAyOTQ4NTEzOX0.e8FfDt9QNXeoqOrV6FHXCn0JU3IShbZMSPtiJzddCME';

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
