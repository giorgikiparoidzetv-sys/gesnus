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
  created_at: string;
  updated_at: string;
}

const DashboardPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    document.title = 'Dashboard | GeSnus';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Your GeSnus account dashboard. View profile info and manage your session.');
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
          <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">Email:</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">Full name:</span>
              <span>{profile?.full_name || '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">Member since:</span>
              <span>
                {profile?.created_at 
                  ? new Date(profile.created_at).toLocaleDateString()
                  : '—'
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">User ID:</span>
              <span className="font-mono text-xs">{user?.id}</span>
            </div>
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
