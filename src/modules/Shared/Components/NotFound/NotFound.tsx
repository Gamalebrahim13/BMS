import { useNavigate } from "react-router-dom";
import notFoundImg from "../../../../assets/images/not-found.png";

export default function NotFound({
  subTitle = "The page you are looking for doesn't exist or has been moved.",
  showButton = true,
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      
      <div className="flex flex-col items-center text-center px-4">
        
        {/* IMAGE */}
        <img
          src={notFoundImg}
          alt="Not Found"
          className="w-full max-w-md object-contain"
        />

        {/* TEXT */}
        <div className="mt-4 space-y-2">
          <p className="text-gray-500 font-bold text-sm md:text-base max-w-md">
            {subTitle}
          </p>
        </div>

        {/* BUTTON */}
        {showButton && (
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 px-6 py-2.5 bg-[#315951] text-white rounded-xl hover:bg-[#24443d] transition-all"
          >
            Back to Dashboard
          </button>
        )}
      </div>
    </div>
  );
}