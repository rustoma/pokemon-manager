'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { CLIENT_ROUTES } from '@/client/consts/clientRoutes';
import { useUser } from '@/client/features/auth/hooks/useUser';
import { LOGIN, SIGNUP } from '@/client/graphql/auth/mutations';
import client from '@/lib/apolloClient';

export const PokemonHeader = () => {
  const { isAuthenticated, setToken } = useUser();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      // Sample login credentials for demonstration
      const { data } = await client.mutate<{ login: string }>({
        mutation: LOGIN,
        variables: {
          email: 'demo@example.com',
          password: 'demo123',
        },
      });

      if (data?.login) {
        // Store token in localStorage
        setToken(data.login);
        // Refresh the page to update Apollo Client headers
        router.refresh();
      }
    } catch {
      // If login fails (e.g., user doesn't exist), create a demo user via signup
      try {
        const { data } = await client.mutate<{ signup: string }>({
          mutation: SIGNUP,
          variables: {
            email: 'demo@example.com',
            password: 'demo123',
          },
        });
        if (data?.signup) {
          setToken(data.signup);
          router.refresh();
        }
      } catch (signupError) {
        console.error('Sign in failed:', signupError);
        alert('Sign in failed. Please try again.');
      }
    }
  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Pokedex</h1>
          {isAuthenticated ? (
            <Link
              href={CLIENT_ROUTES.CUSTOM_POKEMON_NEW()}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 cursor-pointer">
              Add Custom Pokemon
            </Link>
          ) : (
            <button
              onClick={handleSignIn}
              className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 cursor-pointer">
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
