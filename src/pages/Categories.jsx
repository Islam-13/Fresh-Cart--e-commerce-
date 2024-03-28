import { Helmet } from "react-helmet-async";
import useGetData from "../Hook/useGetData";
import CategoryItem from "../featuers/categories/CategoryItem";
import { getAllCategories } from "../services/apiProducts";
import Loader from "../ui/Loader";

function Categories() {
  const { data, isLoading } = useGetData(getAllCategories, ["categories"]);

  if (isLoading) return <Loader />;

  return (
    <div className="container py-5">
      <Helmet>
        <title>Fresh Cart | Categories</title>
      </Helmet>
      <div className="row g-3">
        {data?.data?.map((cat) => (
          <CategoryItem key={cat._id} cat={cat} />
        ))}
      </div>
    </div>
  );
}

export default Categories;
