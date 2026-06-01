import nodataImg from "../../../../assets/images/No-data.png";

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
<div className="flex flex-col items-center justify-center min-h-[300px] w-full text-center">
  {/* IMAGE */}
  <img
    src={nodataImg}
    alt="No Data"
   
    className="w-72  md:w-80 h-auto object-contain opacity-90 -mb-16 md:-mb-20" 
  />

  {/* TEXT */}
  <h3 className="my-6 text-xl md:text-2xl font-bold text-gray/90 tracking-wide">
    No Data Found
  </h3>
</div>
);
}