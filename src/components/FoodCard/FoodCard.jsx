import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
  const { name, recipe, image, _id, price } = item;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const handleAddToCart = () => {
    if (user && user.email) {
      // Send cart item to the database
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };
      axiosSecure.post("/carts", cartItem).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            title: "Good job!",
            text: `${name} added to your cart!`,
            icon: "success",
          });
          //   Refetch to update the cart items count
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not logged in",
        text: "Please login to add to cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
          // Send user to login page here
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div>
      {/* Card Wrapping div */}
      <div className="flex flex-col justify-between items-center bg-[#F3F3F3] h-[540px] shadow-xl">
        {/* Image div */}
        <div className="w-full">
          <img className="w-full h-[240px]" src={image} alt="" />
        </div>
        {/* Image div */}

        {/* Information div */}
        <div className="px-10">
          <h1 className="font-semibold text-2xl text-[#151515] mt-8">{name}</h1>
          <p className="font-normal text-base text-[#737373] mt-2 mb-6">
            {recipe}
          </p>
        </div>
        {/* Information div */}

        {/* Add to cart button div */}
        <div className="mb-8 ">
          <button
            onClick={() => {
              handleAddToCart(item);
            }}
            className="btn text-[#BB8506] border-0 border-b-4 border-b-[#BB8506] bg-[#E8E8E8] font-medium text-xl hover:bg-[#111827] hover:border-b-[#BB8506]"
          >
            ADD TO CART
          </button>
        </div>
        {/* Add to cart button div */}
      </div>
      {/* Card Wrapping div */}
    </div>
  );
};

FoodCard.propTypes = {
  item: PropTypes.object.isRequired,
};
export default FoodCard;
