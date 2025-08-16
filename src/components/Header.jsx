import { Menu } from "lucide-react";
import { useSelector } from "react-redux";

const Header = () => {
  const title = useSelector((state) => state.headerTitle.activeTab);
  return (
    <div className="bg-white px-3 py-4 flex items-center">
      {/* <button className="p-1">
        <Menu size={20} className="text-black" />
      </button> */}
      <h1 className="flex-1 text-center text-base font-semibold text-black">
        {title}
      </h1>
      <div className="w-6"></div> {/* Spacer for centering */}
    </div>
  );
};

export default Header;
