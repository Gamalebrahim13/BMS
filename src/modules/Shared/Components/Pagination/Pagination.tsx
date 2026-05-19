import React from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface PaginationProps {
  currentPage: number;
  totalRecords: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export default function Pagination({
  currentPage,
  totalRecords,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalRecords / pageSize) || 1;

  return (
    <div className="flex items-center justify-end gap-6 bg-white px-6 py-4 mx-10 my-2 rounded-b-lg text-sm text-gray-600 select-none font-sans">
      <div className="flex items-center gap-1.5">
        <span>Showing</span>
        <div className="relative inline-block">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            className="appearance-none bg-white border border-gray-300 rounded-full pl-3 pr-8 py-1 text-xs font-medium text-gray-700 focus:outline-none focus:border-[#315951] cursor-pointer shadow-sm transition-all"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-500 border-l border-gray-200 my-1">
            <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
        <span className="text-gray-500">of <span className="font-medium text-black">{totalRecords}</span> Results</span>
      </div>

      <div className="text-gray-500">
        Page <span className="font-medium text-black">{currentPage}</span> of <span className="font-medium text-black">{totalPages}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 rounded-md border border-gray-200 bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <HiChevronLeft size={18} />
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded-md border border-gray-200 bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <HiChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}