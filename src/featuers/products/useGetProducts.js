import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProducts } from "../../services/apiProducts";
import { useSearchParams } from "react-router-dom";

function useGetProducts() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { data: products, isLoading } = useQuery({
    queryFn: () => getAllProducts(page),
    queryKey: ["products", page],
  });

  const count = products?.metadata?.numberOfPages;

  if (page < count) {
    queryClient.prefetchQuery({
      queryFn: () => getAllProducts(page + 1),
      queryKey: ["products", page + 1],
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryFn: () => getAllProducts(page - 1),
      queryKey: ["products", page - 1],
    });
  }

  return { products, isLoading };
}

export default useGetProducts;
