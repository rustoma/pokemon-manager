import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

import { API_ROUTES } from '@/consts/apiRoutes';

const client = new ApolloClient({
  link: new HttpLink({
    uri: API_ROUTES.GRAPHQL,
    fetch,
    headers: {
      authorization: globalThis.window === undefined ? '' : `Bearer ${localStorage.getItem('token')}`,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
