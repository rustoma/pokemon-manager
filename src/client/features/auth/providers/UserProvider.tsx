'use client';

import { useState, useCallback, useEffect, type ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import { UserContext } from '@/client/features/auth/contexts/UserContext';
import { LOGIN, SIGNUP } from '@/client/graphql/auth/mutations';
import client from '@/lib/apolloClient';

const TOKEN_KEY = 'token';

const getInitialToken = (): string | null => {
  if (globalThis.window === undefined) {
    return null;
  }
  return localStorage.getItem(TOKEN_KEY);
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(getInitialToken);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    //eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true);
  }, []);

  const setToken = useCallback((tokenValue: string) => {
    if (globalThis.window !== undefined) {
      localStorage.setItem(TOKEN_KEY, tokenValue);
      setTokenState(tokenValue);
    }
  }, []);

  const clearToken = useCallback(() => {
    if (globalThis.window !== undefined) {
      localStorage.removeItem(TOKEN_KEY);
      setTokenState(null);
    }
  }, []);

  const signOut = useCallback(async () => {
    clearToken();
    await client.clearStore();
    router.refresh();
  }, [clearToken, router]);

  const signInDemoUser = useCallback(async () => {
    const DEMO_CREDENTIALS = {
      email: 'demo@example.com',
      password: 'demo123',
    };

    try {
      const { data } = await client.mutate<{ login: string }>({
        mutation: LOGIN,
        variables: {
          email: DEMO_CREDENTIALS.email,
          password: DEMO_CREDENTIALS.password,
        },
      });

      if (data?.login) {
        setToken(data.login);
        router.refresh();
      }
    } catch {
      try {
        const { data } = await client.mutate<{ signup: string }>({
          mutation: SIGNUP,
          variables: {
            email: DEMO_CREDENTIALS.email,
            password: DEMO_CREDENTIALS.password,
          },
        });
        if (data?.signup) {
          setToken(data.signup);
          router.refresh();
        }
      } catch (signupError) {
        console.error('Sign in failed:', signupError);
      }
    }
  }, [setToken, router]);

  const isAuthenticated = !!token && isHydrated;

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        setToken,
        clearToken,
        token,
        signOut,
        signInDemoUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};
