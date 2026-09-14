'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Loader2, Mail, KeyRound, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '@/components/auth/auth-provider';
import { useToast } from '@/hooks/use-toast';

type Step = 'method' | 'otp' | 'success';

const RESEND_INTERVAL = 30;

const GOOGLE_ICON = (
  <svg className="h-4 w-4" aria-hidden="true" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.27 14.29A7.21 7.21 0 0 1 4.89 12c0-.8.14-1.57.38-2.29V6.62H1.29A11.97 11.97 0 0 0 0 12c0 1.93.48 3.76 1.34 5.38l3.93-3.09z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.69 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
    />
  </svg>
);

export function AuthModal() {
  const { status, refresh, closeAuth, isOpen } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState<Step>('method');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [resendIn, setResendIn] = useState(0);
  const resendTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const requestCode = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Enter your email address to continue.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/auth/otp/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || 'Could not send a verification code.');
        return;
      }

      setStep('otp');
      setOtp('');
      startResendTimer();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const startResendTimer = () => {
    if (resendTimerRef.current) clearInterval(resendTimerRef.current);
    setResendIn(RESEND_INTERVAL);
    resendTimerRef.current = setInterval(() => {
      setResendIn((current) => {
        if (current <= 1) {
          if (resendTimerRef.current) clearInterval(resendTimerRef.current);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
  };

  const verify = async (e: FormEvent) => {
    e.preventDefault();
    if (otp.trim().length < 4) {
      setError('Enter the 6-digit code we emailed you.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otp.trim() }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || 'Verification failed. Try again.');
        return;
      }

      setStep('success');
      await refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resend = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/auth/otp/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.error || 'Could not resend the code.');
        return;
      }
      setOtp('');
      startResendTimer();
      toast({ title: 'Code sent', description: `We emailed a new code to ${email}.` });
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetStep = () => {
    setStep('method');
    setEmail('');
    setOtp('');
    setError('');
  };

  useEffect(() => {
    return () => {
      if (resendTimerRef.current) clearInterval(resendTimerRef.current);
    };
  }, []);

  const handleClose = () => {
    closeAuth();
    resetStep();
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      handleClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[400px] rounded-2xl border-border/60">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black tracking-tight">
            {step === 'method'
              ? 'Sign in to Delvare'
              : step === 'otp'
                ? 'Enter your code'
                : 'You are signed in'}
          </DialogTitle>
          <DialogDescription>
            {step === 'method' && 'Sign in to submit enquiries to our engineering team.'}
            {step === 'otp' && `We sent a 6-digit code to ${email}.`}
            {step === 'success' && 'Your session is active.'}
          </DialogDescription>
        </DialogHeader>

        {step === 'success' ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <Button className="w-full h-12 rounded-xl font-black" onClick={handleClose}>
              Continue
            </Button>
          </div>
        ) : step === 'otp' ? (
          <form onSubmit={verify} className="space-y-5">
            <Input
              className="h-14 text-center text-2xl font-black tracking-[0.5em] rounded-xl bg-secondary/30 border-border"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={8}
              placeholder="••••••"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/[^0-9]/g, ''));
                setError('');
              }}
              autoFocus
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full h-12 rounded-xl font-black" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
              Verify &amp; Sign In
            </Button>
            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={() => {
                  resetStep();
                  setStep('method');
                }}
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Change email
              </button>
              <button
                type="button"
                onClick={() => void resend()}
                disabled={resendIn > 0 || isSubmitting}
                className="font-bold text-primary disabled:text-muted-foreground disabled:cursor-not-allowed"
              >
                {resendIn > 0 ? `Resend in ${resendIn}s` : 'Resend code'}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-5">
            <form onSubmit={requestCode} className="space-y-5">
              <div className="space-y-2">
                <Input
                  className="h-14 rounded-xl bg-secondary/30 border-border font-semibold"
                  type="email"
                  placeholder="work@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  autoFocus
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>
              <Button type="submit" className="w-full h-12 rounded-xl font-black" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                Email me a code
              </Button>
            </form>

            <div className="flex items-center gap-4">
              <Separator className="flex-1" />
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">or</span>
              <Separator className="flex-1" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 rounded-xl font-semibold"
              disabled={isSubmitting}
              onClick={() => {
                window.location.href = '/api/auth/google';
              }}
            >
              {GOOGLE_ICON}
              Continue with Google
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}