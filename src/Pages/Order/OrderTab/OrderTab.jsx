import PropTypes from "prop-types";
import FoodCard from "../../../components/FoodCard/FoodCard";

const OrderTab = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-[90%] xl:max-w-[80%] mx-auto mt-10 gap-10">
      {items.map((item) => (
        <FoodCard key={item._id} item={item}></FoodCard>
      ))}
    </div>
  );
};

OrderTab.propTypes = {
    items: PropTypes.array.isRequired,
}
export default OrderTab;
