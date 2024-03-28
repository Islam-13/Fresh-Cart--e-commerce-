import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import { getWishlist } from "../../services/apiProducts";
import useAddProduct from "./useAddProduct";
import useAddtoWishlist from "../Wishlist/useAddtoWishlist";
import useGetData from "../../Hook/useGetData";

import Loader from "../../ui/Loader";
import useRemoveWishlist from "../Wishlist/useRemoveWishlist";

function ProductItem({ product }) {
  const { id, imageCover, category, title, price, ratingsAverage } = product;
  const { data, isLoading } = useGetData(getWishlist, ["wishlist"]);
  const { addCartItem, isAdding } = useAddProduct();
  const { addWishlistItem, isAddingWishlist } = useAddtoWishlist();
  const { removeWishlistItem, isDeleteing } = useRemoveWishlist();

  if (isLoading) return <Loader />;

  const inWishlist = data?.data
    ?.map((prod) => prod.id)
    .filter((item) => item === id);

  function handleAddWishlist() {
    addWishlistItem(id);
  }

  function handleRemoveWishlist() {
    removeWishlistItem(id);
  }

  return (
    <div className="col-sm-4 col-md-3 col-lg-2">
      <div className="product overflow-hidden px-2 py-3 cursor-pointer position-relative">
        {inWishlist?.length > 0 ? (
          <i
            role="button"
            className="fa-solid fa-heart heart-icon text-main"
            onClick={handleRemoveWishlist}
            disabled={isDeleteing}
          ></i>
        ) : (
          <i
            role="button"
            className="fa-regular fa-heart heart-icon"
            onClick={handleAddWishlist}
            disabled={isAddingWishlist}
          ></i>
        )}
        <Link to={`/products/${id}`} className="a">
          <img src={imageCover} alt="" className="w-100" />
          <h5 className="text-main font-sm">{category.name}</h5>
          <h5>{title.split(" ").slice(0, 2).join(" ")}</h5>
          <div className="d-flex justify-content-between">
            <span>{formatCurrency(price)}</span>
            <span>
              <i className="fa fa-star"></i> {ratingsAverage}
            </span>
          </div>
        </Link>
        <button
          onClick={() => addCartItem(id)}
          disabled={isAdding}
          className="btn btn-main bg-main text-white w-100"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
