import PropTypes from "prop-types";

const MenuItem = ({ item }) => {
  const { name, recipe, image, price } = item;
  return (
    <div>
      {/* Card Wrapping div */}
      <div className="flex gap-8">
        {/* Image div */}
        <div>
          <img
            className="w-[118px] h-[104px] rounded-tr-full rounded-br-full rounded-bl-full"
            src={image}
            alt={name}
          />
        </div>
        {/* Image div */}

        {/* Info div */}
        <div>
          <h1 className="font-[Cinzel] text-xl text-black">
            {name}--------------
          </h1>
          <p className="text-base text-[#737373] mt-2">{recipe}</p>
        </div>
        {/* Info div */}

        {/* price info div */}
        <div>
          <p className="text-[#BB8506] text-xl font-normal">${price}</p>
        </div>
        {/* price info div */}
      </div>
      {/* Card Wrapping div */}
    </div>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
};
export default MenuItem;
