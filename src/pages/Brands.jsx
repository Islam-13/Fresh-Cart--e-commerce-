import { Helmet } from "react-helmet-async";
import useGetData from "../Hook/useGetData";
import BrandItem from "../featuers/brands/BrandItem";
import { getAllBrands } from "../services/apiProducts";
import Loader from "../ui/Loader";

function Brands() {
  const { data, isLoading } = useGetData(getAllBrands, ["brands"]);

  if (isLoading) return <Loader />;

  return (
    <div className="container py-5">
      <Helmet>
        <title>Fresh Cart | Brands</title>
      </Helmet>
      <div className="row">
        {data?.data?.map((brand) => (
          <BrandItem key={brand._id} brand={brand} />
        ))}
      </div>
    </div>
  );
}

export default Brands;
