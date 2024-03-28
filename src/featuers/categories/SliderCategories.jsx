import useGetData from "../../Hook/useGetData";
import { getAllCategories } from "../../services/apiProducts";

import Slider from "react-slick";
import Loader from "../../ui/Loader";

function SliderCategories() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  const { data: categories, isLoading } = useGetData(getAllCategories, [
    "categories",
  ]);

  if (isLoading) return <Loader />;

  return (
    <div className="container py-5">
      <h2>Shop popular categories</h2>
      <div className="row mt-3">
        <Slider {...settings}>
          {categories?.data.map((cat, i) => {
            return (
              <div key={i}>
                <img src={cat?.image} alt="" width="100%" height="200" />
                <p className="mt-2 text-center">{cat?.name}</p>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default SliderCategories;
