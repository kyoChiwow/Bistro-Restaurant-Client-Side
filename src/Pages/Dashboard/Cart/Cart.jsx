import { FaTrash } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Cart = () => {
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      {/* Header info div here */}
      <div>
        <SectionTitle
          subHeading="---My Cart---"
          mainHeading="ADD MORE?"
        ></SectionTitle>
      </div>
      {/* Header info div here */}

      {/* My Cart div here */}
      <div className="mt-20 max-w-[90%] xl:max-w-[80%] bg-base-300 mx-auto border p-[50px]">
        {/* Cart info div */}
        <div className="flex justify-between items-center">
          <p className="uppercase font-[Cinzel] font-bold text-[32px]">
            Total Orders: {cart.length}
          </p>
          <p className="uppercase font-[Cinzel] font-bold text-[32px]">
            Total Price: ${totalPrice}
          </p>
          <button className="btn uppercase bg-[#D1A054] text-white font-bold text-xl font-[Cinzel]">
            Pay
          </button>
        </div>
        {/* Cart info div */}

        {/* Cart Table div */}
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Image</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, idx) => (
                  <tr key={item._id}>
                    <th>{idx + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <th>
                      <button
                        onClick={() => {
                          handleDelete(item._id);
                        }}
                        className="btn bg-[#B91C1C] text-white"
                      >
                        <FaTrash></FaTrash>
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Cart Table div */}
      </div>
      {/* My Cart div here */}
    </div>
  );
};

export default Cart;
