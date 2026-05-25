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
    // تم تحويل الخلفية إلى شفافة أو متناسقة لتأخذ لون الـ Wrapper (dark:bg-[#111112]) وتعديل نصوص اللايت والدارك
    <div className="flex items-center justify-end gap-6 bg-white dark:bg-[#111112] px-6 py-4 mx-10 my-2 rounded-b-lg text-sm text-gray-600 dark:text-zinc-400 select-none font-sans transition-colors duration-300">
      
      {/* Showing / Page Size */}
      <div className="flex items-center gap-1.5">
        <span className="dark:text-zinc-400">Showing</span>
        <div className="relative inline-block">
          {/* تعديل الـ select ليصبح رمادي غامق بنص فاتح في الدارك مود مثل حقل السيرش */}
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            className="appearance-none bg-white dark:bg-[#161619] border border-gray-300 dark:border-zinc-800 rounded-full pl-3 pr-8 py-1 text-xs font-medium text-gray-700 dark:text-zinc-200 focus:outline-none focus:border-[#315951] dark:focus:border-[#41756a] cursor-pointer shadow-sm transition-all"
          >
            <option value={5} className="dark:bg-[#161619]">5</option>
            <option value={10} className="dark:bg-[#161619]">10</option>
            <option value={20} className="dark:bg-[#161619]">20</option>
            <option value={50} className="dark:bg-[#161619]">50</option>
          </select>
          {/* سهم الـ select الأسفل */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-500 dark:text-zinc-400 border-l border-gray-200 dark:border-zinc-800 my-1">
            <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
        <span className="text-gray-500 dark:text-zinc-400">of <span className="font-medium text-black dark:text-zinc-100">{totalRecords}</span> Results</span>
      </div>

      {/* Page Info */}
      <div className="text-gray-500 dark:text-zinc-400">
        Page <span className="font-medium text-black dark:text-zinc-100">{currentPage}</span> of <span className="font-medium text-black dark:text-zinc-100">{totalPages}</span>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-2">
        {/* زر السابق */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 rounded-md border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#161619] text-gray-400 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          <HiChevronLeft size={18} />
        </button>
        {/* زر التالي */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded-md border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#161619] text-gray-400 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          <HiChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}