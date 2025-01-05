import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popular = menu.filter(item => item.category === 'popular')
  
  return (
    <section>
      <div>
        <SectionTitle
          subHeading="---Check It Out---"
          mainHeading="FROM OUR MENU"
        ></SectionTitle>
      </div>

      {/* Menu card div */}
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-[90%] xl:max-w-[80%] mx-auto gap-6">
        {popular.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      {/* Menu card div */}
    </section>
  );
};

export default PopularMenu;
