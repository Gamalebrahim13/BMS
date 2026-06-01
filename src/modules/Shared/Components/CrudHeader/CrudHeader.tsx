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
    // تم إضافة dark:bg-[#111112] لتتناسق الخلفية مع لوحة التحكم، و dark:border-zinc-800/50 للحدود
    <div className="flex items-center justify-between mb-8 border-t border-black/10 dark:border-zinc-800/50 px-10 py-5 bg-white dark:bg-[#111112] transition-colors duration-300">
      {/* Left Side */}
      <div>
        {linkText && linkPath && (
          <Link
            to={linkPath}
            // تم إضافة dark:text-[#41756a] عشان اللينك الصغير يظهر بوضوح
            className="text-sm text-[#0E382F] dark:text-[#41756a] hover:text-primary mb-1 transition flex items-center justify-content-center gap-2 ">
            <MdKeyboardArrowLeft size={18}/> {linkText}
          </Link>
        )}

        {/* تم إضافة dark:text-zinc-100 عشان لون كلمة Projects يقلب أبيض مريح في الدارك مود */}
        <h2 className="text-2xl font-medium text-black dark:text-zinc-100">{title}</h2>
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