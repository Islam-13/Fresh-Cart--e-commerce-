import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import Loader from "../../ui/Loader";
import useSpecificProduct from "./useSpecificProduct";
import useAddProduct from "./useAddProduct";
import { formatCurrency } from "../../utils/helpers";
import useGetData from "../../Hook/useGetData";
import { getProductsCart } from "../../services/apiCart";
import { Helmet } from "react-helmet-async";

function ProductDetails() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    waitForAnimate: false,
    arrows: false,
  };
  const { product, isLoading } = useSpecificProduct();
  const { id: productId } = useParams();
  const { addCartItem, isAdding } = useAddProduct();
  const { data, isLoading: loadingCart } = useGetData(getProductsCart, [
    "cart",
  ]);

  if (isLoading || loadingCart) return <Loader />;

  const inCart = data?.data?.products
    .map((prod) => prod.product.id)
    .filter((item) => item === productId);

  const { images, title, category, description, price, ratingsAverage } =
    product?.data?.data;

  function handleClick() {
    addCartItem(productId);
  }

  return (
    <div className="container py-5">
      <Helmet>
        <title>Product Details</title>
      </Helmet>
      <div>
        <h6>
          <Link to="/">Home</Link> &gt; <Link to="/categories">Categories</Link>{" "}
          &gt; <Link to={`/{category?.name}`}>{category?.name}</Link>
        </h6>
      </div>
      <div className="row align-items-center py-5 w-75 m-auto">
        <div className="col-md-3">
          <Slider {...settings}>
            {images?.map((img, i) => (
              <img src={img} alt="" key={i} className="w-100" />
            ))}
          </Slider>
        </div>
        <div className="col-md-9 mt-4">
          {inCart?.length > 0 && (
            <p className="in-cart">
              <i className="fa-solid fa-cart-arrow-down"></i> in your cart
            </p>
          )}
          <h2 className="mt-2">{title}</h2>
          <h5 className="mt-2 font-sm text-main">{category?.name}</h5>
          <p className="mt-2">{description}</p>
          <div className="mt-2 d-flex justify-content-between">
            <span>{formatCurrency(price)}</span>
            <span>
              <i className="fa fa-star"></i> {ratingsAverage}
            </span>
          </div>
          <button
            onClick={handleClick}
            disabled={isAdding}
            className="btn text-white bg-main w-100 mt-3"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
