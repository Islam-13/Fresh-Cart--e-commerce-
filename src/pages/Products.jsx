import { Helmet } from "react-helmet-async";
import useGetProducts from "../featuers/products/useGetProducts";

import ProductItem from "../featuers/products/ProductItem";
import Loader from "../ui/Loader";
import Pagination from "../ui/Pagination";
import { useState } from "react";

function Products() {
  const { products, isLoading } = useGetProducts();
  const [query, setQuery] = useState([]);

  function search(e) {
    const term = e.target.value;

    const newArr = products?.data?.filter((ele) =>
      ele.title.toLowerCase().trim().includes(term.toLowerCase().trim())
    );

    if (term.length > 0 && newArr.length === 0) return;

    !term.length || term.length === 0 ? setQuery([]) : setQuery(newArr);
  }

  if (isLoading) return <Loader />;

  const { numberOfPages } = products?.metadata;

  return (
    <div className="container">
      <Helmet>
        <title>Fresh Cart | Products</title>
      </Helmet>

      <div className="w-75 mx-auto mt-3 bg-main py-4 px-5 rounded">
        <input
          type="text"
          className=" form-control"
          placeholder="Search your product ..."
          onChange={search}
        />
      </div>

      <div className="row pt-5 pb-3">
        {query.length
          ? query.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))
          : products?.data?.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}

        {!query.length && <Pagination count={numberOfPages} />}
      </div>
    </div>
  );
}

export default Products;
