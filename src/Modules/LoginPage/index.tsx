// import React, { useState } from "react";

// import TextInput from "../../CommonComponents/TextInput";
// import Button from "../../CommonComponents/Button";
// import userData from "../../data/students.json";
// import induslogo from "../../assets/Images/IndusLogo.jpg";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

// export default function Login() {
//   const [userId, setUserId] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState<{
//     userId?: string;
//     password?: string;
//     academicYear?: string;
//   }>({});

//   const navigate = useNavigate();

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     let formErrors: typeof errors = {};

//     if (!userId.trim()) formErrors.userId = "User ID is required";
//     if (!password.trim()) formErrors.password = "Password is required";

//     setErrors(formErrors);

//     if (Object.keys(formErrors).length > 0) return;
//     const isValidUser = userData.some((user: any) => user.username === userId);
//     if (isValidUser) {
//       localStorage.setItem("userId", userId);
//       alert(`✅ Login successful! Selected Academic Year`);
//       Cookies.set("userId", userId, { expires: 7 }); // expires in 7 days
//       navigate("/studentLearningPathway");
//     } else {
//       setErrors({ password: "❌ Invalid credentials" });
//     }
//     setUserId("");
//     setPassword("");
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen px-3 sm:px-6 bg-gradient-to-b from-[#53825e] via-[#7ea087] to-[#a9c0ae]">
//       <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
        
//         {/* Logo */}
//         <div className="flex justify-center mb-4">
//           <img
//             src={induslogo}
//             alt="Indus Logo"
//             className="h-12 sm:h-16 md:h-20 w-auto object-contain"
//           />
//         </div>

//         {/* Title */}
//         <div className="flex justify-center items-center">
//           <div className="bg-[#e6f6ec] px-3 py-1 text-sm sm:text-md md:text-lg font-semibold inline text-center rounded-sm">
//             Login
//           </div>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleLogin} className="space-y-4">
//           <TextInput
//             label="Email:"
//             value={userId}
//             onChange={(e: any) => setUserId(e.target.value)}
//             placeholder="Enter your User ID"
//             errorMessage={errors.userId}
//             className="w-full text-sm sm:text-base"
//           />

//           <TextInput
//             label="Password:"
//             type="password"
//             value={password}
//             onChange={(e: any) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//             errorMessage={errors.password}
//             className="w-full text-sm sm:text-base"
//           />

//           <div className="w-full">
//             <Button
//               bgColor="bg-[#054916]"
//               textColor="text-white"
//               size="lg"
//               className="w-full text-sm sm:text-base"
//             >
//               Login
//             </Button>
//           </div>

//           <div className="text-[#93cfeb] font-semibold text-center text-xs sm:text-sm md:text-base">
//             If Not Registered, Contact ERL Team
//           </div>
//           <div className="text-red-500 font-semibold text-center text-xs sm:text-sm md:text-base">
//             Forget Password?
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";

import TextInput from "../../CommonComponents/TextInput";
import Button from "../../CommonComponents/Button";
import userData from "../../data/students.json";
import induslogo from "../../assets/Images/IndusLogo.jpg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    userId?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    let formErrors: typeof errors = {};

    if (!userId.trim()) formErrors.userId = "User ID is required";
    if (!password.trim()) formErrors.password = "Password is required";

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) return;

    const isValidUser = userData.some((user: any) => user.username === userId);
    if (isValidUser) {
      localStorage.setItem("userId", userId);
      alert(`✅ Login successful! Selected Academic Year`);
      Cookies.set("userId", userId, { expires: 7 }); // expires in 7 days
      navigate("/studentLearningPathway");
    } else {
      setErrors({ password: "❌ Invalid credentials" });
    }
    setUserId("");
    setPassword("");
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    let formErrors: typeof errors = {};

    if (!userId.trim()) formErrors.userId = "User ID is required";
    if (!password.trim()) formErrors.password = "New password is required";
    if (!confirmPassword.trim()) formErrors.confirmPassword = "Confirm password is required";
    if (password && confirmPassword && password !== confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    const userIndex = userData.findIndex((user: any) => user.username === userId);
    if (userIndex !== -1) {
      alert("✅ Password reset successful!");
      // In real case: update DB via API call
      setIsForgotPassword(false);
      setUserId("");
      setPassword("");
      setConfirmPassword("");
    } else {
      setErrors({ userId: "❌ User not found" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-3 sm:px-6 bg-gradient-to-b from-[#53825e] via-[#7ea087] to-[#a9c0ae]">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
        
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src={induslogo}
            alt="Indus Logo"
            className="h-12 sm:h-16 md:h-20 w-auto object-contain"
          />
        </div>

        {/* Title */}
        <div className="flex justify-center items-center">
          <div className="bg-[#e6f6ec] px-3 py-1 text-sm sm:text-md md:text-lg font-semibold inline text-center rounded-sm">
            {isForgotPassword ? "Reset Password" : "Login"}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={isForgotPassword ? handleForgotPassword : handleLogin} className="space-y-4">
          <TextInput
            label="User ID:"
            value={userId}
            onChange={(e: any) => setUserId(e.target.value)}
            placeholder="Enter your User ID"
            errorMessage={errors.userId}
            className="w-full text-sm sm:text-base"
          />

          {!isForgotPassword && (
            <TextInput
              label="Password:"
              type="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              placeholder="Enter your password"
              errorMessage={errors.password}
              className="w-full text-sm sm:text-base"
            />
          )}

          {isForgotPassword && (
            <>
              <TextInput
                label="New Password:"
                type="password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                placeholder="Enter new password"
                errorMessage={errors.password}
                className="w-full text-sm sm:text-base"
              />

              <TextInput
                label="Confirm Password:"
                type="password"
                value={confirmPassword}
                onChange={(e: any) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                errorMessage={errors.confirmPassword}
                className="w-full text-sm sm:text-base"
              />
            </>
          )}

          <div className="w-full">
            <Button
              bgColor="bg-[#054916]"
              textColor="text-white"
              size="lg"
              className="w-full text-sm sm:text-base"
            >
              {isForgotPassword ? "Reset Password" : "Login"}
            </Button>
          </div>

          {!isForgotPassword && (
            <>
              <div className="text-[#93cfeb] font-semibold text-center text-xs sm:text-sm md:text-base">
                If Not Registered, Contact ERL Team
              </div>
              <div
                className="text-red-500 font-semibold text-center text-xs sm:text-sm md:text-base cursor-pointer"
                onClick={() => setIsForgotPassword(true)}
              >
                Forget Password?
              </div>
            </>
          )}

          {isForgotPassword && (
            <div
              className="text-blue-500 font-semibold text-center text-xs sm:text-sm md:text-base cursor-pointer"
              onClick={() => setIsForgotPassword(false)}
            >
              🔙 Back to Login
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
