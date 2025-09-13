-- Secure access to contact_messages by allowing only staff to SELECT
-- 1) Ensure RLS is enabled on contact_messages
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 2) Create a minimal staff table to mark authorized staff users
CREATE TABLE IF NOT EXISTS public.staff (
  user_id uuid PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on staff (no public policies -> only service role/admins can modify)
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;

-- 3) Allow only staff to view contact messages
DROP POLICY IF EXISTS "Staff can view contact messages" ON public.contact_messages;
CREATE POLICY "Staff can view contact messages"
ON public.contact_messages
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.staff s WHERE s.user_id = auth.uid()
  )
);

-- Keep existing insert policy for public submissions intact
-- No changes to INSERT policy "Anyone can submit contact messages"