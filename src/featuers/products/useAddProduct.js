import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCartItem as addCartItemApi } from "../../services/apiCart";
import toast from "react-hot-toast";

function useAddProduct() {
  const queryClient = useQueryClient();
  const { mutate: addCartItem, isPending: isAdding } = useMutation({
    mutationFn: addCartItemApi,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries("cart");
    },
    onError: (err) => console.error(err.message),
  });
  return { addCartItem, isAdding };
}

export default useAddProduct;
