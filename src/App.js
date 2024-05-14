import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section className="bg-white flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <div className="flex flex-col items-center justify-center min-h-screen bg-white">
          <div className="card bg-gray-100 p-12 rounded-lg shadow-md">
            <div className="rounded-full h-40 w-40 bg-orange-200 flex items-center justify-center mx-auto mb-8">
              <span className="text-6xl text-orange-500">✓</span>
            </div>
            <h1 className="text-4xl font-semibold text-orange-500 mb-4  text-center">
              Success
            </h1>
            <p className="text-sm text-gray-700 text-center">
              Thank you for your effort
              <br /> You have successfully logged in
            </p>
          </div>
        </div>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            {showOTP ? (
              <>
               
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} color={"#fc7f19"} />
                </div>
                <div className="mt-4 mb-2">
                  <div className="font-bold text-base">Verify Details</div>
                  <div className="flex flex-col text-[#a5a8b0] ">OTP sent to {ph && ph.substring(ph.length - 10)}</div>

                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-base text-[#a5a8b0]"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container"
                  inputClassName="border-b-2 border-gray-400 text-center w-1/6 focus:outline-none focus:border-gray-600"
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-[#fc7f19] w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} color={"#fc7f19"} />
                </div>
                <div className="mt-4 mb-2">
                  <div className="font-bold text-xl">LOGIN</div>
                  <div className="flex flex-col text-[#a5a8b0] ">Enter your phone number to continue</div>

                </div>
                {/* <label
                  htmlFor=""
                  className="font-bold text-xl flex flex-col text-center"
                >
                  Verify your phone number
                </label> */}
                <PhoneInput
                  country={"in"}
                  value={ph}
                  onChange={setPh}
                  inputStyle={{
                    borderWidth: "0px",
                    borderBottomWidth: "2px",
                    borderColor: "#a5a8b0",
                    borderRadius: "0px",
                  }}
                />
                <button
                  onClick={onSignup}
                  className="bg-[#fc7f19] w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
                <div className="text-[11px]">
                  By clicking, I accept{" "}
                  <span className="font-bold">
                    Terms & Conditions & Privacy Policy
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default App;
