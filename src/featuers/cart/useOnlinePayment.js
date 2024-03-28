import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOnlineOrder } from "../../services/apiCart";
import toast from "react-hot-toast";

function useOnlinePayment() {
  const queryClient = useQueryClient();
  const { mutate: placeOnlineOrder, isPending: placingOnline } = useMutation({
    mutationFn: createOnlineOrder,
    onSuccess: () => {
      toast.success("Your order has been placed successfully");
      // queryClient.setQueriesData("cart", null);
      queryClient.invalidateQueries("cart");
    },
    onError: (err) => toast.error(err.message),
  });

  return { placeOnlineOrder, placingOnline };
}

export default useOnlinePayment;
