import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zqldjloezipvabunszsw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxbGRqbG9lemlwdmFidW5zenN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0Njg4MDgsImV4cCI6MjAzNDA0NDgwOH0.kHW7J84tJ28rB8V-bPxNvas7pb6qMJpEzISQg8Kmb4U";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
export { supabaseUrl };
