import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import SEOHead from '@/components/SEOHead';

const ConfirmEmailPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        // Get the tokens from URL parameters
        const access_token = searchParams.get('access_token');
        const refresh_token = searchParams.get('refresh_token');
        const token_hash = searchParams.get('token_hash');
        const type = searchParams.get('type');

        // Check if this is an email confirmation
        if (type === 'signup' && access_token && refresh_token) {
          // Set the session with the tokens from the URL
          const { data, error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (error) {
            console.error('Session error:', error);
            setStatus('error');
            setMessage('Email confirmation failed. The link may be expired or invalid.');
            return;
          }

          if (data.user) {
            setStatus('success');
            setMessage('Your email has been successfully confirmed! You can now log in.');
            
            toast({
              title: 'Email Confirmed',
              description: 'Your email has been successfully verified.',
            });

            // Wait a moment then redirect to login
            setTimeout(() => {
              navigate('/auth');
            }, 2000);
          }
        } else if (token_hash && type) {
          // Handle other token types through verify OTP
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as any,
          });

          if (error) {
            console.error('Verification error:', error);
            setStatus('error');
            setMessage('Email confirmation failed. The link may be expired or invalid.');
            return;
          }

          if (data.user) {
            setStatus('success');
            setMessage('Your email has been successfully confirmed! You can now log in.');
            
            toast({
              title: 'Email Confirmed',
              description: 'Your email has been successfully verified.',
            });

            setTimeout(() => {
              navigate('/auth');
            }, 2000);
          }
        } else {
          // No valid confirmation parameters found
          setStatus('error');
          setMessage('Invalid confirmation link. Please check your email for the correct link.');
        }
      } catch (error) {
        console.error('Confirmation error:', error);
        setStatus('error');
        setMessage('An unexpected error occurred during email confirmation.');
      }
    };

    confirmEmail();
  }, [searchParams, navigate, toast]);

  return (
    <>
      <SEOHead 
        title="Email Confirmation | GeSnus"
        description="Confirm your email address to complete your GeSnus account registration."
      />
      <main className="container py-10">
        <section className="mx-auto max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                Email Confirmation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {status === 'loading' && (
                <>
                  <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                  <p className="text-muted-foreground">
                    Confirming your email, please wait...
                  </p>
                </>
              )}
              
              {status === 'success' && (
                <>
                  <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
                  <p className="text-foreground font-medium">{message}</p>
                  <p className="text-sm text-muted-foreground">
                    You will be redirected to the login page automatically.
                  </p>
                </>
              )}
              
              {status === 'error' && (
                <>
                  <XCircle className="h-12 w-12 mx-auto text-destructive" />
                  <p className="text-destructive font-medium">{message}</p>
                  <div className="space-y-2">
                    <Button 
                      onClick={() => navigate('/auth')} 
                      className="w-full"
                    >
                      Go to Login
                    </Button>
                    <Button 
                      onClick={() => navigate('/')} 
                      variant="outline" 
                      className="w-full"
                    >
                      Back to Home
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
};

export default ConfirmEmailPage;