'use client';

import type { ChangeEvent } from 'react';
import { useCallback } from 'react';

import { useRouter } from 'next/navigation';

export const PokemonSort = () => {
  const router = useRouter();

  const handleSortChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const selectedSort = e.target.value;
      router.push(`/?sort=${selectedSort}`);
    },
    [router],
  );

  return (
    <div className="flex items-center gap-2 justify-end">
      <label htmlFor="sort" className="text-[#ADADAD] font-medium">
        Sort by:
      </label>
      <select
        id="sort"
        className="bg-[#313131] text-white flex-1 border-b border-white p-2 focus:outline-none h-10 max-w-40 px-2"
        onChange={handleSortChange}>
        <option value="name">Name</option>
        <option value="height">Height</option>
        <option value="weight">Weight</option>
      </select>
    </div>
  );
};
