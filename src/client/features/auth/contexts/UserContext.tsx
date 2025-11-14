'use client';

import { createContext } from 'react';

interface UserContextType {
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  clearToken: () => void;
  signOut: () => void;
  token: string | null;
  signInDemoUser: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
