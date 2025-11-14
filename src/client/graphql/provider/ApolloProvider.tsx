'use client';

import type { ReactNode } from 'react';

import { ApolloProvider as ApolloProviderReact } from '@apollo/client/react';

import client from '@/lib/apolloClient';

export const ApolloProvider = ({ children }: { children: ReactNode }) => {
  return <ApolloProviderReact client={client}>{children}</ApolloProviderReact>;
};
