'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

export type AuthUser = {
  email: string;
  name: string | null;
  picture: string | null;
  provider: 'email' | 'google';
};

type PendingCallback = (() => void | Promise<void>) | null;

type AuthContextValue = {
  user: AuthUser | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  isOpen: boolean;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
  openAuth: (options?: { onSuccess?: PendingCallback }) => void;
  closeAuth: () => void;
  requireAuth: (callback: PendingCallback) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthContextValue['status']>('loading');
  const [authOpen, setAuthOpen] = useState(false);
  const pendingCallbacksRef = useRef<PendingCallback[]>([]);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/session', {
        method: 'GET',
        cache: 'no-store',
      });
      const data = (await response.json()) as { user?: AuthUser | null };
      setUser(data?.user ?? null);
      setStatus(data?.user ? 'authenticated' : 'unauthenticated');
    } catch (error) {
      console.error('[auth] Failed to fetch session:', error);
      setUser(null);
      setStatus('unauthenticated');
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const closeAuth = useCallback(() => {
    setAuthOpen(false);
    pendingCallbacksRef.current = [];
  }, []);

  const openAuth = useCallback((options?: { onSuccess?: PendingCallback }) => {
    if (options?.onSuccess) {
      pendingCallbacksRef.current = [options.onSuccess];
    }
    setAuthOpen(true);
  }, []);

  const signOut = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('[auth] Failed to sign out:', error);
    }
    setUser(null);
    setStatus('unauthenticated');
  }, []);

  const runPendingCallbacks = useCallback(async () => {
    const pending = pendingCallbacksRef.current;
    pendingCallbacksRef.current = [];
    setAuthOpen(false);
    for (const callback of pending) {
      if (!callback) continue;
      try {
        await callback();
      } catch (error) {
        console.error('[auth] Pending callback failed:', error);
      }
    }
  }, []);

  // If signed in, immediately flush any queued callback (e.g. resume an enquiry submit).
  useEffect(() => {
    if (user && pendingCallbacksRef.current.length > 0) {
      void runPendingCallbacks();
    }
  }, [user, runPendingCallbacks]);

  const requireAuth = useCallback(
    async (callback: PendingCallback): Promise<boolean> => {
      if (user) {
        await callback?.();
        return true;
      }
      if (callback) {
        pendingCallbacksRef.current = [callback];
      }
      setAuthOpen(true);
      return false;
    },
    [user]
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      isOpen: authOpen,
      refresh,
      signOut,
      openAuth,
      closeAuth,
      requireAuth,
    }),
    [user, status, authOpen, refresh, signOut, openAuth, closeAuth, requireAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return context;
}