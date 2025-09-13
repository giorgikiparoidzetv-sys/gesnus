-- Secure contact_messages access and use a SECURITY DEFINER helper

-- 1) Ensure RLS is enabled on sensitive tables
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;

-- 2) Create a security definer helper to check staff membership safely
CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.staff s WHERE s.user_id = _user_id
  );
$$;

-- 3) Replace existing SELECT policy with one using the helper
DROP POLICY IF EXISTS "Staff can view contact messages" ON public.contact_messages;
CREATE POLICY "Staff can view contact messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (public.is_staff(auth.uid()));

-- Note:
-- - No INSERT/UPDATE/DELETE policies are added intentionally, so those are denied by default.
-- - Edge functions use the service role key and will continue to insert rows bypassing RLS safely.