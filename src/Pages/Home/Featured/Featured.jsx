import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg"
import "./Featured.css"

const Featured = () => {
    return (
        <div>
            <header>
                <SectionTitle
                    subHeading="---Check it out---"
                    mainHeading="Featured Item"
                ></SectionTitle>
            </header>

            {/* Card wrapping div */}
            <div className="flex gap-[70px] bg-fixed items-center px-[300px] py-[130px] featured-item">
                {/* Image div */}
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                {/* Image div */}

                {/* Info div */}
                <div>
                    <p className="text-2xl text-white font-normal">March 20, 2023</p>
                    <p className="text-2xl text-white font-normal">WHERE CAN I GET SOME?</p>
                    <p className="text-xl text-white font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-6 border-white text-white">Read More</button>
                </div>
                {/* Info div */}
            </div>
            {/* Card wrapping div */}

        </div>
    );
};

export default Featured;