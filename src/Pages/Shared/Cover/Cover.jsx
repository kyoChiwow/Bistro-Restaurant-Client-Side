import PropTypes from "prop-types";
import { Parallax } from "react-parallax";

const Cover = ({ img, coverTitle, coverSubtitle }) => {
  return (
    <Parallax
      blur={{ min: -15, max: 15 }}
      bgImage={img}
      bgImageAlt="the dog"
      strength={-200}
    >
      <div className="hero h-[700px]">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 font-bold uppercase font-[Cinzel] text-7xl text-white">
              {coverTitle}
            </h1>
            <p className="mb-5 font-[Cinzel] font-semibold text-2xl text-white uppercase">
              {coverSubtitle}
            </p>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

Cover.propTypes = {
  img: PropTypes.string.isRequired,
  coverTitle: PropTypes.string.isRequired,
  coverSubtitle: PropTypes.string.isRequired,
};
export default Cover;
