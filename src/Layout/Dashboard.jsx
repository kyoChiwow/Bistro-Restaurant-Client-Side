import {
  FaBook,
  FaCalendar,
  FaCalendarCheck,
  FaEnvelope,
  FaHome,
  FaShoppingBag,
  FaShoppingCart,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import { ImSpoonKnife } from "react-icons/im";
import { IoMenu } from "react-icons/io5";
import { TbMessageStar } from "react-icons/tb";
import { TfiMenuAlt } from "react-icons/tfi";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();

  return (
    <div className="flex">
      {/* Drawer div here */}
      <div className="w-64 min-h-screen bg-[#D1A054] px-6 pt-[50px]">
        {/* Header info div here */}
        <div>
          <h1 className="font-[Cinzel] font-extrabold text-2xl text-[#151515]">
            BISTRO BOSS
          </h1>
          <h1 className="font-[Cinzel] font-bold text-lg text-[#151515 tracking-[5px]">
            RESTAURANT
          </h1>
        </div>
        {/* Header info div here */}

        {/* Listed items div */}
        <div className="mt-4">
          <ul className="menu gap-6">
            {isAdmin ? (
              <>
                <li>
                  <NavLink to={"/dashboard/adminhome"}>
                    <FaHome></FaHome>
                    ADMIN HOME
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/additems"}>
                    <ImSpoonKnife></ImSpoonKnife>
                    ADD ITEMS
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/manageitems"}>
                    <TfiMenuAlt></TfiMenuAlt>
                    MANAGE ITEMS
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/managebookings"}>
                    <FaBook></FaBook>
                    MANAGE BOOKINGS
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/users"}>
                    <FaUsers></FaUsers>
                    ALL USERS
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to={"/dashboard/home"}>
                    {" "}
                    <FaHome></FaHome> USER HOME
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/reservation"}>
                    {" "}
                    <FaCalendar></FaCalendar> RESERVATION
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/history"}>
                    {" "}
                    <FaWallet></FaWallet> PAYMENT HISTORY
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/cart"}>
                    {" "}
                    <FaShoppingCart></FaShoppingCart> MY CART
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/review"}>
                    {" "}
                    <TbMessageStar></TbMessageStar> ADD REVIEW
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/booking"}>
                    {" "}
                    <FaCalendarCheck></FaCalendarCheck> MY BOOKING
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        {/* Listed items div */}

        {/* Divider div here */}
        <div className="divider divider-warning"></div>
        {/* Divider div here */}

        {/* Drawer bottom menus div here (Shared) */}
        <div>
          <ul className="menu gap-6">
            <li>
              <NavLink to={"/"}>
                <FaHome></FaHome>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to={"/menu"}>
                <IoMenu></IoMenu>
                MENU
              </NavLink>
            </li>
            <li>
              <NavLink to={"/order/salad"}>
                <FaShoppingBag></FaShoppingBag>
                SHOP
              </NavLink>
            </li>
            <li>
              <NavLink to={"/"}>
                <FaEnvelope></FaEnvelope>
                CONTACT
              </NavLink>
            </li>
          </ul>
        </div>
        {/* Drawer bottom menus div here (Shared) */}
      </div>
      {/* Drawer div here */}

      {/* Outlet div here */}
      <div className="flex-1 bg-white max-w-[80%] mx-auto">
        <Outlet></Outlet>
      </div>
      {/* Outlet div here */}
    </div>
  );
};

export default Dashboard;
