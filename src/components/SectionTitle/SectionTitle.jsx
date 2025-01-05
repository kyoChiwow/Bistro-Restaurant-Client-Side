import PropTypes from "prop-types";

const SectionTitle = ({ mainHeading, subHeading }) => {
  return (
    <div>
      <div className="text-center my-10 w-[20%] mx-auto">
        <p className="text-xl italic text-[#D99904] mb-4">{subHeading}</p>
        <h3 className="text-[40px] text-black border-y-4 py-3">
          {mainHeading}
        </h3>
      </div>
    </div>
  );
};

SectionTitle.propTypes = {
  mainHeading: PropTypes.string.isRequired,
  subHeading: PropTypes.string.isRequired,
};
export default SectionTitle;
