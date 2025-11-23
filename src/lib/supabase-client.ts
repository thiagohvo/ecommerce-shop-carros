import { createClient } from '@supabase/supabase-js';

/**
 * URL base do projeto Supabase
 * Usado para conectar com o banco de dados e serviços do Supabase
 */
const supabaseUrl = 'https://jrxbyyddkvvsojtizxcc.supabase.co';

/**
 * Chave pública (anon key) do Supabase
 * Permite acesso anônimo aos recursos públicos do banco de dados
 * Nota: Esta chave é segura para uso no frontend
 */
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyeGJ5eWRka3Z2c29qdGl6eGNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NDQ5NDgsImV4cCI6MjA2OTMyMDk0OH0.cj3WCzA0wTBjP3iiWmrwmVdS68apU0t9I09ab-lABz0';

/**
 * Cliente Supabase configurado para a aplicação.
 * Fornece acesso ao banco de dados, autenticação e storage.
 * 
 * Uso:
 * import { supabase } from '@/lib/supabase';
 * const { data, error } = await supabase.from('table').select();
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);