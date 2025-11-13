'use client';

import type { FormEvent } from 'react';
import { useCallback, useState, useMemo } from 'react';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';

export const PokemonAdvanceFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const urlParams = useMemo(
    () => ({
      minHeight: searchParams?.get('minHeight') || '',
      maxHeight: searchParams?.get('maxHeight') || '',
      minWeight: searchParams?.get('minWeight') || '',
      maxWeight: searchParams?.get('maxWeight') || '',
    }),
    [searchParams],
  );

  const [minHeight, setMinHeight] = useState(urlParams.minHeight);
  const [maxHeight, setMaxHeight] = useState(urlParams.maxHeight);
  const [minWeight, setMinWeight] = useState(urlParams.minWeight);
  const [maxWeight, setMaxWeight] = useState(urlParams.maxWeight);

  const handleApplyFilters = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!searchParams) return;
      const params = new URLSearchParams(searchParams.toString());

      // Update filter params
      if (minHeight) {
        params.set('minHeight', minHeight);
      } else {
        params.delete('minHeight');
      }

      if (maxHeight) {
        params.set('maxHeight', maxHeight);
      } else {
        params.delete('maxHeight');
      }

      if (minWeight) {
        params.set('minWeight', minWeight);
      } else {
        params.delete('minWeight');
      }

      if (maxWeight) {
        params.set('maxWeight', maxWeight);
      } else {
        params.delete('maxWeight');
      }

      // Reset to page 1 when filters change
      params.set('page', '1');

      router.push(`/?${params.toString()}`);
    },
    [minHeight, maxHeight, minWeight, maxWeight, router, searchParams],
  );

  const handleClearFilters = useCallback(() => {
    if (!searchParams) return;
    const params = new URLSearchParams(searchParams.toString());
    params.delete('minHeight');
    params.delete('maxHeight');
    params.delete('minWeight');
    params.delete('maxWeight');
    params.set('page', '1');
    setMinHeight('');
    setMaxHeight('');
    setMinWeight('');
    setMaxWeight('');
    router.push(`/?${params.toString()}`);
  }, [router, searchParams]);

  const hasActiveFilters = minHeight || maxHeight || minWeight || maxWeight;

  return (
    <div className="bg-[#616161]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-white font-medium hover:text-white transition-colors">
            <span>Show advanced search</span>
            {isOpen ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
          </button>
        </div>

        {isOpen && (
          <form onSubmit={handleApplyFilters} className="mt-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="minHeight" className="text-white font-medium">
                  Min Height
                </label>
                <input
                  id="minHeight"
                  type="number"
                  min="0"
                  placeholder="Minimum height"
                  className="bg-white border-b border-white p-2 focus:outline-none h-10"
                  value={minHeight}
                  onChange={(e) => setMinHeight(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="maxHeight" className="text-white font-medium">
                  Max Height
                </label>
                <input
                  id="maxHeight"
                  type="number"
                  min="0"
                  placeholder="Maximum height"
                  className="bg-white border-b border-white p-2 focus:outline-none h-10"
                  value={maxHeight}
                  onChange={(e) => setMaxHeight(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="minWeight" className="text-white font-medium">
                  Min Weight
                </label>
                <input
                  id="minWeight"
                  type="number"
                  min="0"
                  placeholder="Minimum weight"
                  className="bg-white border-b border-white p-2 focus:outline-none h-10"
                  value={minWeight}
                  onChange={(e) => setMinWeight(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="maxWeight" className="text-white font-medium">
                  Max Weight
                </label>
                <input
                  id="maxWeight"
                  type="number"
                  min="0"
                  placeholder="Maximum weight"
                  className="bg-white border-b border-white p-2 focus:outline-none h-10"
                  value={maxWeight}
                  onChange={(e) => setMaxWeight(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="bg-[#EE6B30] text-white px-6 py-2 rounded-md hover:bg-[#d85a25] transition-colors">
                Apply Filters
              </button>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors">
                  Clear Filters
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
