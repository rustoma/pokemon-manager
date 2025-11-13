import { useContext } from 'react';

import { GraphQLError } from 'graphql';

import { UserContext } from '@/features/auth/contexts/UserContext';

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new GraphQLError('useUser must be used within a UserProvider');
  }
  return context;
};
