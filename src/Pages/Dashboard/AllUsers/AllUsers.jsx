import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaTrash, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`)
    .then(res => {
        console.log(res.data);
        if(res.data.modifiedCount > 0){
            refetch();
            Swal.fire({
                title: `${user.name} is an ADMIN now!`,
                text: "You clicked the button!",
                icon: "success"
              });
        }
    })
  }

  const handleDeleteUser = (user) => {
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
            axiosSecure.delete(`/users/${user._id}`).then((res) => {
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
      {/* Header div */}
      <div>
        <SectionTitle
          subHeading="---How Many?---"
          mainHeading="MANAGE ALL USERS"
        ></SectionTitle>
      </div>
      {/* Header div */}

      {/* Table div */}
      <div className="bg-white p-[50px]">
        {/* Table Header */}
        <div>
          <h1 className="uppercase font-[Cinzel] font-bold text-[32px] text-black mb-4">
            total users: {users.length}
          </h1>
        </div>
        {/* Table Header */}

        {/* Table Wrapping div */}
        <div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead className="bg-[#D1A054]">
                <tr>
                  <th></th>
                  <th className="uppercase text-white">Name</th>
                  <th className="uppercase text-white">Email</th>
                  <th className="uppercase text-white">Role</th>
                  <th className="uppercase text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user._id}>
                    <th>{idx + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      { user.role === 'admin' ? 'Admin' : <button
                      onClick={() => handleMakeAdmin(user)} 
                      className="btn bg-[#D1A054] text-white">
                        <FaUsers></FaUsers>
                      </button>}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="btn bg-red-700 text-white"
                      >
                        <FaTrash></FaTrash>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Table Wrapping div */}
      </div>
      {/* Table div */}
    </div>
  );
};

export default AllUsers;
