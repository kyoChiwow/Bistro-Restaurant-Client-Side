import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const [isAdmin] = useAdmin();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => {
        console.log(err.message);
      });
  };

  const navOptions = (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "font-extrabold text-xl text-[#EEFF25]"
            : "font-extrabold text-xl font-white"
        }
        to={"/"}
      >
        HOME
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "font-extrabold text-xl text-[#EEFF25]"
            : "font-extrabold text-xl font-white"
        }
        to={"/"}
      >
        CONTACT US
      </NavLink>
      {
        user && isAdmin && <NavLink
        className={({ isActive }) =>
          isActive
            ? "font-extrabold text-xl text-[#EEFF25]"
            : "font-extrabold text-xl font-white"
        }
        to={"/dashboard/adminHome"}
      >
        DASHBOARD
      </NavLink>
      }
      {
        user && !isAdmin && <NavLink
        className={({ isActive }) =>
          isActive
            ? "font-extrabold text-xl text-[#EEFF25]"
            : "font-extrabold text-xl font-white"
        }
        to={"/dashboard/userHome"}
      >
        DASHBOARD
      </NavLink>
      }
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "font-extrabold text-xl text-[#EEFF25]"
            : "font-extrabold text-xl font-white"
        }
        to={"/menu"}
      >
        OUR MENU
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "font-extrabold text-xl text-[#EEFF25]"
            : "font-extrabold text-xl font-white"
        }
        to={"/order/salad"}
      >
        OUR SHOP
      </NavLink>
    </>
  );
  return (
    <div className="navbar bg-[#151515] bg-opacity-50 fixed z-10 text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navOptions}
          </ul>
        </div>
        <div className="flex flex-col">
          <a className="btn btn-ghost font-extrabold text-3xl font-[Cinzel]">
            Bistro Boss
          </a>
          <a className="btn btn-ghost font-bold text-2xl font-[Cinzel]">
            Restaurant
          </a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">{navOptions}</ul>
      </div>
      <div className="navbar-end gap-4">
        <NavLink to={"/dashboard/cart"}>
          <div className="indicator">
            <span className="indicator-item badge badge-secondary">
              +{cart.length}
            </span>
            <button className="btn btn-circle text-xl">
              <FaShoppingCart />
            </button>
          </div>
        </NavLink>
        {user ? (
          <>
            <button onClick={handleLogOut} className="btn btn-warning">
              Sign Out
            </button>
          </>
        ) : (
          <>
            <NavLink
              className={"font-extrabold text-xl font-white"}
              to={"/login"}
            >
              LOGIN
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
