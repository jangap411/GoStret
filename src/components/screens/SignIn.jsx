import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, redirect, useNavigate } from "react-router-dom";
import { loginSuccess } from "../../store/feature/authSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  //get login state from redux
  const dispatch = useDispatch();

  // create error state
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContinue = async () => {
    //check required fields
    if (!formData.emailOrPhone || !formData.password) {
      console.log("Please fill in all fields");
      setErrorMessage("Please fill in all fields");
      setIsError(true);
      return;
    }

    //fake check user
    if (
      formData?.emailOrPhone === "admin@email.com" &&
      formData?.password === "password"
    ) {
      dispatch(loginSuccess({ email: formData.emailOrPhone }));
      navigate("/home");
      // redirect("/home");
      console.log("login success");
    } else {
      setErrorMessage("Invalid email or password");
      setIsError(true);
      return;
    }

    console.log("Continue with credentials:", formData);
  };

  const handleFacebookLogin = () => {
    console.log("Continue with Facebook");
  };

  const handleAppleLogin = () => {
    console.log("Continue with Apple");
  };

  return (
    <>
      <div className="min-h-screen bg-white flex items-center justify-center p-6 relative font-sans">
        <div className="w-full max-w-sm relative">
          {/* Back Arrow */}
          <button
            onClick={() => navigate(-1)}
            className="absolute -top-2 -left-2 p-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <ArrowLeft size={16} className="text-black" />
          </button>

          {/* Header */}
          <h1 className="text-lg font-semibold text-black text-center mb-5 pt-8">
            Welcome back
          </h1>

          {/* Login Form */}
          <div className="space-y-3">
            {/* <form> */}
            <div>
              {/* alert when error */}
              {isError && (
                <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-4">
                  <p className="text-sm">{errorMessage}</p>
                </div>
              )}
            </div>
            {/* Email */}
            <input
              required
              type="email"
              name="emailOrPhone"
              placeholder="Email"
              value={formData.emailOrPhone}
              onChange={handleInputChange}
              className="w-full bg-gray-50 border-none rounded-lg px-3.5 py-3 text-sm outline-none placeholder-gray-600"
            />

            {/* Password */}
            <input
              required
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-gray-50 border-none rounded-lg px-3.5 py-3 text-sm outline-none placeholder-gray-600"
            />

            {/* Forgot Password Link */}
            <Link
              to="/forgot-password"
              className="block text-xs text-amber-700 underline mb-5 hover:text-amber-800 transition-colors"
            >
              Forgot password?
            </Link>
            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="w-full bg-yellow-300 hover:bg-yellow-400 border-none rounded-full py-3 px-3 text-sm font-semibold text-black cursor-pointer transition-colors mb-5"
            >
              Continue
            </button>

            {/* Divider */}
            <p className="text-xs text-gray-500 text-center my-4">
              Or connect with
            </p>

            {/* Social Login Buttons */}
            <button
              onClick={handleFacebookLogin}
              className="w-full bg-gray-50 hover:bg-amber-100 border-none rounded-full py-3 px-3 text-sm font-semibold text-black cursor-pointer transition-colors mb-3"
            >
              Continue with Gmail
            </button>

            {/* <button
              onClick={handleAppleLogin}
              className="w-full bg-amber-50 hover:bg-amber-100 border-none rounded-full py-3 px-3 text-sm font-semibold text-black cursor-pointer transition-colors mb-3"
            >
              Continue with Apple
            </button> */}
            {/* </form> */}
          </div>

          {/* Footer Text */}
          <p className="text-xs text-gray-500 text-center mt-5">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-amber-700 underline hover:text-amber-800 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
