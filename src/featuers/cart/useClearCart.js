import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCart as clearCartApi } from "../../services/apiCart";
import toast from "react-hot-toast";

function useClearCart() {
  const queryClient = useQueryClient();
  const { mutate: clearCart, isPending: isClearing } = useMutation({
    mutationFn: clearCartApi,
    onSuccess: () => {
      toast.success("Cart has cleared successfully");
      queryClient.setQueriesData("cart", null);
    },
    onError: (err) => toast.error(err.message),
  });
  return { clearCart, isClearing };
}

export default useClearCart;
