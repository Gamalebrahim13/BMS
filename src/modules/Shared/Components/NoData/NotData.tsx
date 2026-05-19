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
    <div className="flex flex-col items-center justify-center py-10 text-center">
      {/* IMAGE */}
      <img
        src={nodataImg}
        alt="No Data"
        className="w-32 h-32 object-contain opacity-80"
      />
      <h3 className="mt-3 text-lg font-semibold text-gray-700">No Data Found</h3>
    </div>
  );
}
