'use client';

import { createContext } from 'react';

interface UserContextType {
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  clearToken: () => void;
  token: string | null;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
