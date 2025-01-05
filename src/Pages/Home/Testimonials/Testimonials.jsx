import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);

  return (
    <section>
      <header>
        <SectionTitle
          subHeading="---What Out Clients Say---"
          mainHeading="TESTIMONIALS"
        ></SectionTitle>
      </header>

      {/* Swiper div here */}
      <div className="max-w-[90%] xl:max-w-[80%] mx-auto">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="px-20 text-center flex flex-col items-center gap-10">
                <Rating style={{ maxWidth: 180 }} value={review.rating} readOnly />
                <p className="text-[#444444] text-xl font-normal">
                  {review.details}
                </p>
                <h3 className="font-medium text-4xl mt-4 text-[#CD9003]">
                  {review.name}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Swiper div here */}
    </section>
  );
};

export default Testimonials;
