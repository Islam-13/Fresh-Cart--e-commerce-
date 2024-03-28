import { Helmet } from "react-helmet-async";
import useGetData from "../Hook/useGetData";
import ProductItem from "../featuers/products/ProductItem";
import { getWishlist } from "../services/apiProducts";
import Loader from "../ui/Loader";
import Empty from "../ui/Empty";
function WishList() {
  const { data, isLoading } = useGetData(getWishlist, ["wishlist"]);

  if (isLoading) return <Loader />;

  return (
    <div className="container py-5">
      <h1 className="mt-5">Wishlist</h1>
      <Helmet>
        <title>Fresh Cart | WishList</title>
      </Helmet>

      {data?.count > 0 ? (
        <div className="row">
          {data?.data?.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <Empty>Your Wishlist is empty!!</Empty>
      )}
    </div>
  );
}

export default WishList;
