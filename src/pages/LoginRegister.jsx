import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../context/useAuth.js";

const LoginRegister = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async () => {
    const newErrors = {};
    if (!validateEmail(loginEmail)) newErrors.loginEmail = "Invalid email address";
    if (!loginPassword) newErrors.loginPassword = "Incorrect password";

    if (Object.keys(newErrors).length === 0) {
      try {
        await loginUser(loginEmail, loginPassword);
        navigate("/home");
      } catch (err) {
        setErrors({ loginPassword: err.message });
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleRegister = async () => {
    const newErrors = {};
    if (!registerData.firstName || !registerData.lastName)
      newErrors.registerName = "Name required";
    if (!validateEmail(registerData.email))
      newErrors.registerEmail = "Invalid email address";
    if (!registerData.password || registerData.password.length < 6)
      newErrors.registerPassword = "Password too short";
    if (registerData.password !== registerData.confirmPassword)
      newErrors.registerConfirm = "Passwords do not match";

    if (Object.keys(newErrors).length === 0) {
      try {
        await registerUser(registerData.email, registerData.password, {
          firstName: registerData.firstName,
          lastName: registerData.lastName,
        });
        navigate("/home");
      } catch (err) {
        setErrors({ registerEmail: err.message });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-[#E6EEF5] flex justify-center items-center">
      <div className="bg-white w-[390px] h-[812px] rounded-2xl shadow-xl px-6 py-6 font-serif flex flex-col justify-center">
        <div className="flex flex-col justify-center">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-1">Welcome</h2>
            <p className="text-sm text-gray-600">
              By {activeTab === "login" ? "signing in" : "registering"} you are agreeing to our
              <span className="text-blue-500 cursor-pointer"> terms and privacy policy</span>
            </p>
          </div>

          <div className="flex justify-center mb-6 gap-6">
            <button
              className={`font-medium ${activeTab === "login" ? "text-black border-b-2 border-blue-700" : "text-gray-400"}`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`font-medium ${activeTab === "register" ? "text-black border-b-2 border-blue-700" : "text-gray-400"}`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          {activeTab === "login" ? (
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input-style"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                {errors.loginEmail && (
                  <p className="text-red-500 text-xs mt-1">{errors.loginEmail}</p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="input-style"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                {errors.loginPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.loginPassword}</p>
                )}
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <label><input type="checkbox" className="mr-1" /> Remember password</label>
                <span className="text-blue-500 cursor-pointer">Forgot password?</span>
              </div>
              <button
                onClick={handleLogin}
                className="bg-[#1D4C79] text-white w-full py-2 rounded mt-1"
              >
                Login
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="First Name"
                className="input-style"
                value={registerData.firstName}
                onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="input-style"
                value={registerData.lastName}
                onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="input-style"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              />
              {errors.registerEmail && <p className="text-red-500 text-xs -mt-2">{errors.registerEmail}</p>}
              <input
                type="password"
                placeholder="Password"
                className="input-style"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="input-style"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
              />
              {errors.registerConfirm && <p className="text-red-500 text-xs -mt-2">{errors.registerConfirm}</p>}
              <div className="flex items-center text-xs text-gray-500">
                <input type="checkbox" className="mr-1" /> Remember password
              </div>
              <button onClick={handleRegister} className="bg-[#1D4C79] text-white w-full py-2 rounded">
                Register
              </button>
              {Object.keys(errors).length > 0 && (
                <p className="text-center text-sm text-red-500 mt-2">
                  Invalid data, cannot register account. <br /> Please check information.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
