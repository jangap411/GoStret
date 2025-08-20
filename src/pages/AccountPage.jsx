import {
  ArrowLeft,
  Settings,
  Bell,
  CreditCard,
  Shield,
  Lock,
  HelpCircle,
  FileText,
} from "lucide-react";
import { logout } from "../store/feature/authSlice";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../store/appSlice";

const AccountPage = () => {
  const dispatch = useDispatch();

  const menuItems = [
    { key: "preferences", label: "Preferences", icon: Settings },
    { key: "notifications", label: "Notifications", icon: Bell },
    { key: "payment", label: "Payment", icon: CreditCard },
    { key: "security", label: "Security", icon: Shield },
    { key: "privacy", label: "Privacy", icon: Lock },
    { key: "help", label: "Help", icon: HelpCircle },
    { key: "legal", label: "Legal", icon: FileText },
  ];

  // handle signout
  const handleSignOut = () => {
    dispatch(logout());
    dispatch(setActiveTab("GoStret"));
  };

  return (
    <>
      {/* <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-6 px-4"> */}
      {/* <div className="bg-white w-full max-w-sm rounded-2xl p-4 shadow-lg shadow-slate-900/5"> */}
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        {/* <div className="flex items-center mb-3 ">
          <button className="p-1.5 -ml-1.5 rounded-full hover:bg-gray-50 transition-colors">
            <ArrowLeft size={20} className="text-gray-900" />
          </button>
          <h1 className="flex-1 text-center text-base font-semibold text-gray-900 pr-8">
            Account
          </h1>
        </div> */}

        {/* Menu Items */}
        <div className="space-y-3.5 mb-6">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.key}
                className="w-full flex items-center px-0.5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gray-200 transition-colors">
                  <IconComponent size={18} className="text-gray-600" />
                </div>
                <span className="text-gray-600 font-medium text-sm">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full bg-gray-100 text-gray-900 font-semibold text-sm py-3 rounded-full hover:bg-gray-200 transition-colors mt-6 mb-1"
        >
          Sign out
        </button>
        {/* </div> */}
      </div>
    </>
  );
};

export default AccountPage;
