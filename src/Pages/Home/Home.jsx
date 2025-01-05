import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Featured from "./Featured/Featured";
import PopularMenu from "./PopularMenu/PopularMenu";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
    return (
        <div>
            {/* Banner div */}
            <div>
                <Banner></Banner>
            </div>
            {/* Banner div */}

            {/* Category slider div */}
            <div className="max-w-[90%] xl:max-w-[80%] mx-auto">
                <Category></Category>
            </div>
            {/* Category slider div */}

            {/* Popular Menu div  */}
            <div className="mt-20">
                <PopularMenu></PopularMenu>
            </div>
            {/* Popular Menu div  */}

            {/* Featured Item Div */}
            <div className="mt-20">
                <Featured></Featured>
            </div>
            {/* Featured Item Div */}

            {/* Testimonials div */}
            <div className="mt-20">
                <Testimonials></Testimonials>
            </div>
            {/* Testimonials div */}
        </div>
    );
};

export default Home;