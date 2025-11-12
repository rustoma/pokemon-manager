import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

import { API_ROUTES } from '@/consts/apiRoutes';

const getGraphQLUri = () => {
  if (globalThis.window === undefined) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    return `${baseUrl}${API_ROUTES.GRAPHQL}`;
  }

  return API_ROUTES.GRAPHQL;
};

const client = new ApolloClient({
  ssrMode: globalThis.window === undefined,
  link: new HttpLink({
    uri: getGraphQLUri(),
    fetch,
    headers: {
      authorization: globalThis.window === undefined ? '' : `Bearer ${localStorage.getItem('token')}`,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
