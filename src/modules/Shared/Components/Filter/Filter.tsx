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
    <div className="flex items-center gap-2">
      
      {/* Search Input */}
      <div className="m-4 relative w-64">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent rounded-full border border-[#26385A40] px-10 py-2 pr-10 outline-none placeholder:text-[#AAAAAA]"
        />

        <FiSearch
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>

      {/* Filter Button */}
      <button
        onClick={onFilterClick}
        className="bg-transparent rounded-full px-6 py-2 border border-[#26385A40] flex items-center gap-3"
      >
        <IoFilterSharp size={18} />
        Filter
      </button>
    </div>
  );
}