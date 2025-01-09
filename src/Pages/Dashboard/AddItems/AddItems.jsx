import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
            'content-type' : 'multipart/form-data'
        }
    });
    if(res.data.success) {
        // Now send the menu item data to the server with the image url
        const menuItem = {
            name: data.name,
            category: data.categorey,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: res.data.data.display_url
        }
        // 
        const menuRes = await axiosSecure.post("/menu", menuItem);
        console.log(menuRes.data);
        if(menuRes.data.insertedId) {
            // Show Success popup
            reset();
            Swal.fire({
                title: "Good job!",
                text: `${data.name} is added to the menu`,
                icon: "success"
              });
        }
    }
    console.log('with image url', res.data);
  };
  return (
    <div>
      {/* Header div here */}
      <header>
        <SectionTitle
          subHeading="---What's New?---"
          mainHeading="Add an item"
        ></SectionTitle>
      </header>
      {/* Header div here */}

      {/* Form div here */}
      <main className="bg-base-300 p-[50px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full mb-6">
            <div className="label">
              <span className="label-text">Recipe name*</span>
            </div>
            <input
              type="text"
              placeholder="Recipe Name"
              {...register("name", { required: true })}
              className="input input-bordered w-full"
            />
          </label>
          <div className="flex gap-6 mb-6">
            {/* Category */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Category*</span>
              </div>
              <select
                defaultValue="default"
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select a Category
                </option>
                <option value="salad">salad</option>
                <option value="pizza">pizza</option>
                <option value="soup">soup</option>
                <option value="dessert">dessert</option>
                <option value="drinks">drinks</option>
              </select>
            </label>
            {/* Category */}

            {/* Price */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Price*</span>
              </div>
              <input
                type="number"
                placeholder="Price"
                {...register("price", { required: true })}
                className="input input-bordered w-full"
              />
            </label>
            {/* Price */}
          </div>

          {/* Recipe Description */}
          <label className="form-control mb-6">
            <div className="label">
              <span className="label-text">Recipe Details</span>
            </div>
            <textarea
              {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-40"
              placeholder="Recipe Details"
            ></textarea>
          </label>
          {/* Recipe Description */}

          {/* File inpur div */}
          <div className="form-control w-full">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>
          {/* File inpur div */}

          {/* Button div here */}
          <div className="mt-8">
            <button className="btn">
              Add Items <FaUtensils className="ml-2"></FaUtensils>
            </button>
          </div>
          {/* Button div here */}
        </form>
      </main>
      {/* Form div here */}
    </div>
  );
};

export default AddItems;
