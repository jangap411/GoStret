import ForgotPassword from "./components/screens/ForgotPassword";
import SignIn from "./components/screens/SignIn";
import SignUp from "./components/screens/SignUp";
import Landing from "./pages/Landing";
import MainLayout from "./pages/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRouteLayout from "./pages/PublicRouteLayout";
import ProtectedRoute from "./pages/ProtectedRoute";
import HomePage from "./pages/HomePage";
import RidesScreen from "./components/screens/RidesScreen";
import Payments from "./components/Payments";
import RideShareApp from "./components/screens/RideShareApp";
import RideActivity from "./components/RideActivity";
import AccountPage from "./pages/AccountPage";
import PublicRoute from "./pages/PublicRoute";
import { useSelector } from "react-redux";
const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(`isLoggedIn: ${isLoggedIn}`);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          {/* FIXME: Update isLogin prop based on authentication state */}
          <Route element={<PublicRoute isLogin={isLoggedIn} />}>
            <Route element={<PublicRouteLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>
          </Route>

          {/* Private routes */}
          <Route element={<ProtectedRoute isLogin={isLoggedIn} />}>
            <Route element={<MainLayout />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/rides" element={<RidesScreen />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/share" element={<RideShareApp />} />
              <Route path="/activity" element={<RideActivity />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
