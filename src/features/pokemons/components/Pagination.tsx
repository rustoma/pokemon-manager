'use client';

import React, { useCallback } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  limit: number;
}

const ALLOWED_LIMITS = [10, 20, 50] as const;

export const Pagination = ({ currentPage, limit }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (updates: { page?: number; limit?: number }) => {
      const params = new URLSearchParams(searchParams?.toString() ?? '');

      if (updates.page !== undefined) {
        if (updates.page <= 1) {
          params.delete('page');
        } else {
          params.set('page', updates.page.toString());
        }
      }

      if (updates.limit !== undefined) {
        if (updates.limit === 10) {
          params.delete('limit');
        } else {
          params.set('limit', updates.limit.toString());
        }
      }

      const queryString = params.toString();
      router.push(queryString ? `/?${queryString}` : '/');
    },
    [router, searchParams],
  );

  const handleLimitChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedLimit = Number(e.target.value);
      updateParams({ limit: selectedLimit, page: 1 });
    },
    [updateParams],
  );

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      updateParams({ page: currentPage - 1 });
    }
  }, [currentPage, updateParams]);

  const handleNext = useCallback(() => {
    updateParams({ page: currentPage + 1 });
  }, [currentPage, updateParams]);

  return (
    <div className="flex items-center justify-between gap-4 py-6 px-4">
      <div className="flex items-center gap-2">
        <label htmlFor="limit-select" className="text-sm font-medium text-gray-700">
          Items per page:
        </label>
        <select
          id="limit-select"
          value={limit}
          onChange={handleLimitChange}
          className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none">
          {ALLOWED_LIMITS.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage <= 1}
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white cursor-pointer">
          <ChevronLeftIcon className="w-4 h-4" />
          Previous
        </button>

        <span className="text-sm font-medium text-gray-700">Page {currentPage}</span>

        <button
          onClick={handleNext}
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
          Next
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
