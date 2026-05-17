import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

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
    <div className="flex items-center justify-between mb-8 px-10 py-5 ">
      {/* Left Side */}
      <div>
        {linkText && linkPath && (
          <Link
            to={linkPath}
            className="text-sm text-gray-400 hover:text-primary transition ">
            {linkText}
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
