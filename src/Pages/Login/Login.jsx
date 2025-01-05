import { useContext, useEffect, useRef, useState } from "react";
import loginBg from "../../assets/others/authentication.png";
import loginImg from "../../assets/others/authentication2.png";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const captchaRef = useRef();
  const [disabled, setDisabled] = useState(true);
  const { signInEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";


  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleValidateCaptcha = () => {
    const user_captcha_value = captchaRef.current.value;
    if (validateCaptcha(user_captcha_value) === true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    const email = e.target.loginEmail.value;
    const password = e.target.loginPassword.value;

    // Calling the signin function here
    signInEmail (email, password)
    .then(res => {
       const user = res.user;
       console.log(user);
       Swal.fire({
        title: "Logged in successfully",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        },
      });
      navigate(from, { replace: true });
    })
    // Calling the signin function here
  };

  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div
        className="hero-content flex-col lg:flex-row border w-[70%] drop-shadow-2xl py-[58px]"
        style={{
          backgroundImage: `url(${loginBg})`,
          boxShadow: "10px 10px 10px 10px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="text-center lg:text-left">
          <img src={loginImg} alt="" />
        </div>
        <div className="card bg-base-100 w-full max-w-md">
          <form onSubmit={handleEmailLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                name="loginEmail"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Your Password"
                name="loginPassword"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <LoadCanvasTemplate />
              </label>
              <input
                type="text"
                placeholder="Enter Your CAPTCHA"
                name="loginCaptcha"
                ref={captchaRef}
                className="input input-bordered"
                required
              />
              <button
              type="button"
                onClick={handleValidateCaptcha}
                className="btn bg-[#D1A054B3] btn-xs mt-4 text-white"
              >
                Validate
              </button>
            </div>
            <div className="form-control mt-6">
              <button disabled={disabled} className="btn bg-[#D1A054B3] text-white">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
