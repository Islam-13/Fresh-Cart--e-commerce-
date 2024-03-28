import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartItem } from "../../services/apiCart";

function useUpdateCart() {
  const queryClient = useQueryClient();
  const { mutate: updateItem, isPending: isUpdating } = useMutation({
    mutationFn: updateCartItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries("cart");
    },
    onError: (err) => console.error(err.message),
  });
  return { updateItem, isUpdating };
}

export default useUpdateCart;
