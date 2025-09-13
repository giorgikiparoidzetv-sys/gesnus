-- Tighten write access to contact_messages: remove public INSERT policy
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'contact_messages' 
      AND policyname = 'Anyone can submit contact messages'
  ) THEN
    EXECUTE 'DROP POLICY "Anyone can submit contact messages" ON public.contact_messages';
  END IF;
END $$;

-- Note: Edge functions using the service role key bypass RLS and can still insert.
