import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cleanupAuthState, moveAuthKeysToSession } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const emailSchema = z.string().email('Please enter a valid email');
const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Include at least one uppercase letter')
  .regex(/[a-z]/, 'Include at least one lowercase letter')
  .regex(/[0-9]/, 'Include at least one number');

const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  fullName: z.string().min(2, 'Please enter your full name'),
});

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().default(true),
});

type SignUpValues = z.infer<typeof signupSchema>;
type LoginValues = z.infer<typeof loginSchema>;

const AuthPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    // Basic SEO
    document.title = tab === 'login' ? 'Login | SnusShop' : 'Sign Up | SnusShop';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Secure account authentication for SnusShop. Login or register to manage your orders.');
    } else {
      const m = document.createElement('meta');
      m.name = 'description';
      m.content = 'Secure account authentication for SnusShop. Login or register to manage your orders.';
      document.head.appendChild(m);
    }
    const linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      const l = document.createElement('link');
      l.rel = 'canonical';
      l.href = window.location.href;
      document.head.appendChild(l);
    }
  }, [tab]);

  const signupForm = useForm<SignUpValues>({ resolver: zodResolver(signupSchema), defaultValues: { email: '', password: '', fullName: '' } });
  const loginForm = useForm<LoginValues>({ resolver: zodResolver(loginSchema), defaultValues: { email: '', password: '', remember: true } });

  const onSignup = async (values: SignUpValues) => {
    try {
      cleanupAuthState();
      try { await supabase.auth.signOut({ scope: 'global' }); } catch {}

      const redirectUrl = `${window.location.origin}/`;
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: { full_name: values.fullName }
        }
      });
      if (error) throw error;

      toast({ title: 'Verification email sent', description: 'Check your inbox to verify your email before logging in.' });
      setTab('login');
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Sign up failed', description: err?.message || 'Please try again.' });
    }
  };

  const onLogin = async (values: LoginValues) => {
    try {
      cleanupAuthState();
      try { await supabase.auth.signOut({ scope: 'global' }); } catch {}

      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) throw error;

      // If remember me is false, move tokens to sessionStorage
      if (!values.remember) moveAuthKeysToSession();

      if (data.user) {
        toast({ title: 'Welcome back', description: data.user.email || 'Signed in successfully.' });
        // Full refresh avoids limbo states
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      const message = err?.message || 'Invalid credentials or email not verified.';
      toast({ variant: 'destructive', title: 'Login failed', description: message });
    }
  };

  return (
    <main className="container py-10">
      <section className="mx-auto max-w-md">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-foreground">Account</h1>
          <p className="text-sm text-muted-foreground">Login or create your account</p>
        </header>

        <Tabs value={tab} onValueChange={(v) => setTab(v as 'login' | 'signup')} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-6">
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4" aria-label="Login form">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input id="login-email" type="email" autoComplete="email" {...loginForm.register('email')} />
                {loginForm.formState.errors.email && (
                  <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input id="login-password" type="password" autoComplete="current-password" {...loginForm.register('password')} />
                {loginForm.formState.errors.password && (
                  <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input type="checkbox" className="h-4 w-4" defaultChecked {...loginForm.register('remember')} />
                  Remember me
                </label>
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="mt-6">
            <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4" aria-label="Sign up form">
              <div className="space-y-2">
                <Label htmlFor="signup-fullname">Full name</Label>
                <Input id="signup-fullname" type="text" autoComplete="name" {...signupForm.register('fullName')} />
                {signupForm.formState.errors.fullName && (
                  <p className="text-sm text-destructive">{signupForm.formState.errors.fullName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" autoComplete="email" {...signupForm.register('email')} />
                {signupForm.formState.errors.email && (
                  <p className="text-sm text-destructive">{signupForm.formState.errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" autoComplete="new-password" {...signupForm.register('password')} />
                {signupForm.formState.errors.password && (
                  <p className="text-sm text-destructive">{signupForm.formState.errors.password.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full">Create account</Button>
              <p className="text-xs text-muted-foreground text-center">By creating an account, you agree to receive a verification email.</p>
            </form>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default AuthPage;
