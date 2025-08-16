import { Edit, HelpingHand, LifeBuoy, Phone } from "lucide-react";

const FloatingButton = () => {
  return (
    <>
      <div className="fixed bottom-20 right-6">
        <button className="bg-orange-500 text-white p-3 rounded-full shadow-lg flex items-center">
          <LifeBuoy size={20} className="mr-2" />
          <span>SOS</span>
        </button>
      </div>
    </>
  );
};

export default FloatingButton;
