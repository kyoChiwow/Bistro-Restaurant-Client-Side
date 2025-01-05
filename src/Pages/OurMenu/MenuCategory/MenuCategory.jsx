import PropTypes from "prop-types";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import { NavLink } from "react-router-dom";

const MenuCategory = ({ items, title, coverImg }) => {

  return (
    <div className="pt-8">
      {title && (
        <Cover
          img={coverImg}
          coverTitle={title}
          coverSubtitle="Would You Like To Try A Dish?"
        ></Cover>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-[90%] xl:max-w-[80%] mx-auto gap-6 my-[100px]">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="flex justify-center">
        <NavLink to={`/order/${title}`}>
          <button className="btn btn-outline border-0 border-b-4 mt-6 border-[#1F2937] text-[#1F2937]">
            ORDER YOUR FAVORITE FOOD
          </button>
        </NavLink>
      </div>
    </div>
  );
};

MenuCategory.propTypes = {
  items: PropTypes.array,
  title: PropTypes.string,
  coverImg: PropTypes.string,
};
export default MenuCategory;
