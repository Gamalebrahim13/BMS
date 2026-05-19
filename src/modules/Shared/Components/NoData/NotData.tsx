import { useNavigate } from "react-router-dom";
import nodataImg from "../../../../assets/images/no-data.png";

interface NoDataProps {
  title?: string;
  subTitle?: string;
  showButton?: boolean;
  buttonText?: string;
  navigateTo?: string;
}

export default function NoData({

}: NoDataProps) {

return (
  <div className="flex flex-col items-center justify-center min-h-[300px] text-center w-full">
    
    {/* IMAGE */}
    <img
      src={nodataImg}
      alt="No Data"
      className="w-48 h-48 object-contain opacity-90"
    />

    {/* TEXT */}
    <h3 className="mt-5 text-2xl font-bold text-gray-700">
      No Data Found
    </h3>
  </div>
);
}