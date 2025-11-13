'use client';

import { useState, useCallback, type ReactNode } from 'react';

import { UserContext } from '@/client/features/auth/contexts/UserContext';

const TOKEN_KEY = 'token';

const getInitialToken = (): string | null => {
  if (globalThis.window === undefined) {
    return null;
  }
  return localStorage.getItem(TOKEN_KEY);
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(getInitialToken);

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

  const isAuthenticated = !!token;

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        setToken,
        clearToken,
        token,
      }}>
      {children}
    </UserContext.Provider>
  );
};
