import { useForm } from "react-hook-form";
import loginBg from "../../assets/others/authentication.png";
import loginImg from "../../assets/others/authentication2.png";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { signUpEmail, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const onSubmit = (data) => {
    console.log(data);
    signUpEmail(data.registerEmail, data.registerPassword).then((res) => {
      const loggedUser = res.user;
      console.log(loggedUser);
      updateUserProfile(data.registerName, data.registerPhoto)
        .then(() => {
          // Create user entry in the database
          const userInfo = {
            name: data.registerName,
            email: data.registerEmail,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user added to the database");
              reset();
              Swal.fire({
                title: "Good job!",
                text: "You have created your profile!",
                icon: "success",
              });
              navigate("/");
            }
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
      navigate("/");
    });
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Register</title>
      </Helmet>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url(${loginBg})` }}
      >
        <div
          className="hero-content flex-col lg:flex-row-reverse border w-[70%] drop-shadow-2xl py-[58px]"
          style={{
            backgroundImage: `url(${loginBg})`,
            boxShadow: "10px 10px 10px 10px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="text-center lg:text-left">
            <img src={loginImg} alt="" />
          </div>
          <div className="card w-full max-w-md">
            <div>
              <h1 className="font-bold text-[40px] text-black mb-[56px] text-center">
                Sign Up
              </h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  {...register("registerName", { required: true })}
                  name="registerName"
                  className="input input-bordered"
                />
                {errors.registerName && (
                  <span className="text-red-600 mt-2 ml-1">
                    Your Name is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Photo URL"
                  {...register("registerPhoto", { required: true })}
                  className="input input-bordered"
                />
                {errors.registerPhoto && (
                  <span className="text-red-600 mt-2 ml-1">
                    Photo URL is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  {...register("registerEmail", { required: true })}
                  name="registerEmail"
                  className="input input-bordered"
                />
                {errors.registerEmail && (
                  <span className="text-red-600 mt-2 ml-1">
                    Your Email is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  {...register("registerPassword", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
                  })}
                  name="registerPassword"
                  className="input input-bordered"
                />
                {errors.registerPassword?.type === "required" && (
                  <span className="text-red-600 mt-2 ml-1">
                    Password is required
                  </span>
                )}
                {errors.registerPassword?.type === "minLength" && (
                  <span className="text-red-600 mt-2 ml-1">
                    Password must be atleast 6 characters long!
                  </span>
                )}
                {errors.registerPassword?.type === "maxLength" && (
                  <span className="text-red-600 mt-2 ml-1">
                    Password must be less than 20 characters!
                  </span>
                )}
                {errors.registerPassword?.type === "pattern" && (
                  <span className="text-red-600 mt-2 ml-1">
                    Password must have 1 uppercase, 1 lowercase and 1 digit in
                    it!
                  </span>
                )}
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-[#D1A054B3] text-white">
                  Register
                </button>
              </div>
            </form>

            {/* Social Login div here */}
            <div className="flex justify-center items-center mb-4 w-full">
              <SocialLogin></SocialLogin>
            </div>
            {/* Social Login div here */}

            {/* Login redirect here */}
            <div className="py-2 text-center">
              <NavLink to={"/login"}>
                <p>
                  Do not have an account?{" "}
                  <span className="text-green-700 font-bold">Login Here!</span>
                </p>
              </NavLink>
            </div>
            {/* Login redirect here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
