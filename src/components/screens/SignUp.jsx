import { HelpCircle } from "lucide-react";
import { useState } from "react";
import { Link, replace, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SignUp = () => {
  // navigate from react router
  const navigate = useNavigate();

  // create error state
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // login data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailOrPhone: "",
    password: "",
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.emailOrPhone ||
      !formData.password
    ) {
      setErrorMessage("Please fill in all fields");
      setIsError(true);
    }

    if (agreedToTerms) {
      console.log("Form submitted:", formData);
      navigate("/home", { replace: true });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white flex items-center justify-center p-6 relative font-sans">
        {/* Help Icon */}
        <button className="absolute top-4 right-4 p-1 hover:bg-gray-50 rounded-full transition-colors">
          <HelpCircle size={16} className="text-black" />
        </button>

        {/* Main Container */}
        <div className="w-full max-w-sm">
          {/* Header */}
          <h1 className="text-xl font-bold text-black mb-4">
            Create your account
          </h1>

          {/* Form */}
          <div className="space-y-3">
            {/* display alert when error */}
            <div>
              {isError && (
                <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-4">
                  <p className="text-sm">{errorMessage}</p>
                </div>
              )}
            </div>
            {/* First Name */}
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full bg-gray-50 border-none rounded-lg px-3.5 py-3 text-sm outline-none placeholder-gray-600"
            />

            {/* Last Name */}
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full bg-gray-50 border-none rounded-lg px-3.5 py-3 text-sm outline-none placeholder-gray-600"
            />

            {/* Email or Phone */}
            <input
              type="text"
              name="emailOrPhone"
              placeholder="Email or phone number"
              value={formData.emailOrPhone}
              onChange={handleInputChange}
              className="w-full bg-gray-50 border-none rounded-lg px-3.5 py-3 text-sm outline-none placeholder-gray-600"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-gray-50 border-none rounded-lg px-3.5 py-3 text-sm outline-none placeholder-gray-600"
            />

            {/* Terms and Privacy Checkbox */}
            <div className="flex items-start gap-2 py-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-yellow-400"
              />
              <label
                htmlFor="terms"
                className="text-xs text-black leading-relaxed"
              >
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!agreedToTerms}
              className={`w-full py-3 px-3 rounded-full text-sm font-semibold text-black transition-all ${
                agreedToTerms
                  ? "bg-yellow-300 hover:bg-yellow-400 cursor-pointer"
                  : "bg-gray-200 cursor-not-allowed opacity-60"
              }`}
            >
              Sign up
            </button>
          </div>

          {/* Sign In Link */}
          <div className="text-center mt-3">
            <Link
              to="/signin"
              className="text-xs text-gray-500 underline hover:text-gray-700 transition-colors"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
