import { useQuery } from "@tanstack/react-query";
import { getSpecificProduct } from "../../services/apiProducts";
import { useParams } from "react-router-dom";

function useSpecificProduct() {
  const { id } = useParams();
  const { data: product, isLoading } = useQuery({
    queryFn: () => getSpecificProduct(id),
    queryKey: ["productDetails", id],
    retry: false,
  });
  return { product, isLoading };
}

export default useSpecificProduct;
