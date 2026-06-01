import React from 'react';
import { FiSearch } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";

type FilterProps = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  onFilterClick?: () => void;
};

export default function Filter({
  searchValue,
  setSearchValue,
  placeholder = "Search...",
  onFilterClick,
}: FilterProps) {
  return (
    <div className="flex items-center gap-3 w-full sm:w-auto">
      
      {/* Search Input Container */}
      <div className="relative w-full sm:w-64">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
          /* تم إضافة كلاسات الـ dark لتغيير الخلفية، الحدود، ولون النص، وحالة الـ focus */
          className="w-full bg-white dark:bg-[#1e293b] rounded-full border border-[#26385A40] dark:border-gray-700 pl-10 pr-4 py-2 text-sm text-gray-800 dark:text-gray-100 outline-none placeholder:text-[#AAAAAA] dark:placeholder:text-gray-500 focus:border-[#315951] dark:focus:border-[#315951] focus:ring-1 focus:ring-[#315951] transition-all shadow-sm"
        />

        {/* Search Icon */}
        <FiSearch
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
        />
      </div>

      {/* Filter Button */}
      {onFilterClick && (
        <button
          onClick={onFilterClick}
          /* تم إضافة كلاسات الـ dark لزر الفلتر وتغيير لون الأيقونة الأخضر ليكون مضيء ومريح للعين في التعتيم */
          className="bg-white hover:bg-gray-50 dark:bg-[#1e293b] dark:hover:bg-[#334155] text-gray-700 dark:text-gray-200 rounded-full px-5 py-2 border border-[#26385A40] dark:border-gray-700 flex items-center gap-2 text-sm font-medium transition-all shadow-sm active:scale-95"
        >
          <IoFilterSharp size={16} className="text-[#315951] dark:text-[#4ade80]" />
          <span>Filter</span>
        </button>
      )}
    </div>
  );
}