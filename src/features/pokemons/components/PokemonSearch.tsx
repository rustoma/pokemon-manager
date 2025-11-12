'use client';

import { useCallback, useState } from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export const PokemonSearch = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');

  const handleSearch = useCallback(() => {
    if (inputValue.trim()) {
      router.push(`/?search=${inputValue}`);
    }
  }, [inputValue, router]);

  return (
    <div className="flex bg-[#313131] px-4 py-6">
      <div className="container mx-auto flex gap-10">
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="text-white text-lg font-bold">Name or Number</h3>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search for a pokemon"
              className="bg-white flex-1 border-b border-white p-2 focus:outline-none h-10"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="bg-[#EE6B30] text-white shrink-0 rounded-md cursor-pointer h-10 w-10 flex items-center justify-center"
              onClick={handleSearch}>
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
          </div>
          <p className="text-white text-sm">
            Use the Advanced Search to explore Pokémon by type, weakness, ability, and more!
          </p>
        </div>
        <div className="p-4 bg-[#4DAE5B] flex justify-center items-center rounded-md">
          <p className="text-white font-medium">Search Pokémon by name or using its National Pokédex number.</p>
        </div>
      </div>
    </div>
  );
};
