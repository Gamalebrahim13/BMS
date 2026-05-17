import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdKeyboardArrowLeft } from "react-icons/md";

type HeaderProps = {
  title: string;
  buttonText?: string;
  onButtonClick?: () => void;

  linkText?: string;
  linkPath?: string;
};

export default function CrudHeader({
  title,
  buttonText,
  onButtonClick,
  linkText,
  linkPath,
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8 border-t border-black/10 px-10 py-5 bg-white ">
      {/* Left Side */}
      <div>
        {linkText && linkPath && (
          <Link
            to={linkPath}
            className="text-sm text-[#0E382F] hover:text-primary mb-1 transition flex items-center justify-content-center gap-2 ">
            <MdKeyboardArrowLeft  size={18}/> {linkText}
          </Link>
        )}

        <h2 className="text-2xl font-medium">{title}</h2>
      </div>
      {/* Right Side */}
      {buttonText && (
        <button
          onClick={onButtonClick}
          className="bg-primary flex items-center gap-4 text-white px-5 py-2 rounded-full">
          <FaPlus /> {buttonText}
        </button>
      )}
    </div>
    
  );
}
