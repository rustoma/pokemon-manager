'use client';

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

import { CLIENT_ROUTES } from '@/client/consts/clientRoutes';

export const SurpriseMeButton = () => {
  const router = useRouter();

  const handleSurpriseMe = () => {
    const randomId = Math.floor(Math.random() * 100) + 1;
    router.push(CLIENT_ROUTES.POKEMON_DETAIL(randomId));
  };

  return (
    <button
      onClick={handleSurpriseMe}
      className="bg-blue-400 text-white flex gap-2 items-center px-4 py-2 cursor-pointer rounded-md hover:bg-[#414141] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
      <ArrowPathIcon className="w-4 h-4" /> Surprise Me!
    </button>
  );
};
