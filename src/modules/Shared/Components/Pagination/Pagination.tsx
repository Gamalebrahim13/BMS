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
  <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-4 sm:gap-6 bg-white dark:bg-[#111112] px-4 sm:px-6 py-4 mx-4 sm:mx-10 my-2 rounded-b-lg text-sm text-gray-600 dark:text-zinc-400 select-none font-sans transition-colors duration-300">
    
    <div className="flex items-center gap-1.5 order-2 sm:order-1">
      <span className="dark:text-zinc-400">Showing</span>
      <div className="relative inline-block">
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
          className="appearance-none bg-white dark:bg-[#161619] border border-[#4f4f4f] dark:border-zinc-800 rounded-full pl-3 pr-8 py-1 text-xs font-medium text-[#4f4f4f] dark:text-zinc-200 focus:outline-none focus:border-[#315951] dark:focus:border-[#41756a] cursor-pointer shadow-sm transition-all"
        >
          <option value={5} className="dark:bg-[#161619]">5</option>
          <option value={10} className="dark:bg-[#161619]">10</option>
          <option value={20} className="dark:bg-[#161619]">20</option>
          <option value={50} className="dark:bg-[#161619]">50</option>
        </select>
        {/* سهم الـ select الأسفل */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#4f4f4f] dark:text-zinc-400 border-l border-[#4f4f4f] dark:border-zinc-800 my-1">
          <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
      <span className="text-gray-500 dark:text-zinc-400">of <span className="font-medium text-black dark:text-zinc-100">{totalRecords}</span> Results</span>
    </div>

    {/* Page Info */}
    <div className="text-gray-500 dark:text-zinc-400 order-1 sm:order-2">
      Page <span className="font-medium text-black dark:text-zinc-100">{currentPage}</span> of <span className="font-medium text-black dark:text-zinc-100">{totalPages}</span>
    </div>

    {/* Navigation Buttons */}
    <div className="flex items-center gap-2 order-3">
      {/* زر السابق */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1.5 rounded-md border border-[#4f4f4f] dark:border-zinc-800 bg-white dark:bg-[#161619] text-[#4f4f4f] dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
      >
        <HiChevronLeft size={18} />
      </button>
      {/* زر التالي */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-1.5 rounded-md border border-[#4f4f4f] dark:border-zinc-800 bg-white dark:bg-[#161619] text-[#4f4f4f] dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
      >
        <HiChevronRight size={18} />
      </button>
    </div>
  </div>
);
}