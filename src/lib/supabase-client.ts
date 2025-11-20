import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jrxbyyddkvvsojtizxcc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyeGJ5eWRka3Z2c29qdGl6eGNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NDQ5NDgsImV4cCI6MjA2OTMyMDk0OH0.cj3WCzA0wTBjP3iiWmrwmVdS68apU0t9I09ab-lABz0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
