'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { CLIENT_ROUTES } from '@/client/consts/clientRoutes';

interface PokemonNavProps {
  prev?: { id: number; name: string } | null;
  next?: { id: number; name: string } | null;
}

export const PokemonNav = ({ prev, next }: PokemonNavProps) => {
  return (
    <div className="flex items-center justify-between gap-2">
      {prev && (
        <div className="flex flex-1 items-center gap-2 justify-start bg-[#A4A4A4] p-4">
          <Link href={CLIENT_ROUTES.POKEMON_DETAIL(prev.id)} className="flex items-center gap-2 justify-start ">
            <div className="flex items-center justify-center rounded-full bg-white p-0.5">
              <ChevronLeftIcon className="w-4 h-4" />
            </div>
            <p className="text-white text-2xl">#{prev.id}</p>
            <h4 className="text-[#363636] text-2xl">{prev.name}</h4>
          </Link>
        </div>
      )}
      {next && (
        <div className="flex flex-1 items-center gap-2 justify-end bg-[#A4A4A4] p-4">
          <Link href={CLIENT_ROUTES.POKEMON_DETAIL(next.id)} className="flex items-center gap-2 justify-end ">
            <p className="text-white text-2xl">#{next.id}</p>
            <h4 className="text-[#363636] text-2xl">{next.name}</h4>
            <div className="flex items-center justify-center rounded-full bg-white p-0.5">
              <ChevronRightIcon className="w-4 h-4" />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};
