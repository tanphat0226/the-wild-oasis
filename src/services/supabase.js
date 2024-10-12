import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://hcnhvzhbtdjhexhevixf.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhjbmh2emhidGRqaGV4aGV2aXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4ODg0OTEsImV4cCI6MjA0MTQ2NDQ5MX0.5yIenGdJzos9BwX_VH6VlLHdCK2iwsKrxojVUFzaVG8';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
