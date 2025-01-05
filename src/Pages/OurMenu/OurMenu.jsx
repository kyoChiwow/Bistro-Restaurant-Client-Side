import { Helmet } from "react-helmet-async";
import Cover from "../Shared/Cover/Cover";
import menuImg from "../../assets/menu/banner3.jpg"
import useMenu from "../../hooks/useMenu";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import MenuCategory from "./MenuCategory/MenuCategory";
import dessertImg from "../../assets/menu/dessert-bg.jpeg"
import pizzaImg from "../../assets/menu/pizza-bg.jpg"
import saladImg from "../../assets/menu/salad-bg.jpg"
import soupImg from "../../assets/menu/soup-bg.jpg"

const OurMenu = () => {
    const [ menu ] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const soup = menu.filter(item => item.category === 'soup');
    const offered = menu.filter(item => item.category === 'offered');
    return (
        <div>
            <Helmet>
                <title>Bistro | Menu</title>
            </Helmet>
            <Cover img={menuImg} coverTitle={"Our Menu"} coverSubtitle="Would You Like To Try A Dish?"></Cover>
            <SectionTitle subHeading="---Don't Miss---" mainHeading="Today's Offer"></SectionTitle>
            
            <MenuCategory items={offered}></MenuCategory>
            <MenuCategory items={dessert} title={"dessert"} coverImg={dessertImg}></MenuCategory>
            <MenuCategory items={pizza} title={"pizza"} coverImg={pizzaImg}></MenuCategory>
            <MenuCategory items={salad} title={"salad"} coverImg={saladImg}></MenuCategory>
            <MenuCategory items={soup} title={"soup"} coverImg={soupImg}></MenuCategory>
        </div>
    );
};

export default OurMenu;