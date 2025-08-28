import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { cleanupAuthState } from '@/lib/auth';

interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
}

const DashboardPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    document.title = 'Dashboard | SnusShop';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Your SnusShop account dashboard. View profile info and manage your session.');
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    // Defer fetching profile to avoid deadlocks
    const t = setTimeout(async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      if (error) {
        toast({ variant: 'destructive', title: 'Failed to load profile', description: error.message });
      } else {
        setProfile(data as Profile | null);
      }
    }, 0);
    return () => clearTimeout(t);
  }, [user, toast]);

  const logout = async () => {
    try {
      cleanupAuthState();
      try { await supabase.auth.signOut({ scope: 'global' }); } catch {}
      window.location.href = '/auth';
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Logout failed', description: e?.message || 'Please try again.' });
    }
  };

  return (
    <main className="container py-10">
      <section className="mx-auto max-w-2xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your account</p>
        </header>

        <article className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-2">Profile</h2>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Email:</span> {user?.email}</p>
            <p><span className="font-medium">Full name:</span> {profile?.full_name || '—'}</p>
            <p><span className="font-medium">User ID:</span> {user?.id}</p>
          </div>
        </article>

        <div>
          <Button onClick={logout}>Log out</Button>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
