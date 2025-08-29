-- Remove overly permissive RLS policy that allows any authenticated user to view all contact messages
DROP POLICY IF EXISTS "Authenticated users can view contact messages" ON public.contact_messages;

-- Contact messages will now only be accessible via the secure Edge function for processing
-- This ensures customer privacy by making contact data completely private