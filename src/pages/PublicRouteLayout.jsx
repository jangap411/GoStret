import { Outlet } from "react-router-dom";

const PublicRouteLayout = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex justify-center pt-6 px-4">
        <div className="bg-white w-full max-w-sm rounded-2xl shadow-lg shadow-slate-900/5 flex flex-col">
          {/* public pages here */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default PublicRouteLayout;
