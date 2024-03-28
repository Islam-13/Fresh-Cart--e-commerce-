import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCashOrder } from "../../services/apiCart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCashPayment() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: placeCashOrder, isPending: placingCash } = useMutation({
    mutationFn: createCashOrder,
    onSuccess: () => {
      queryClient.setQueriesData("cart", null);
      toast.success("Your order has been placed successfully");
      navigate("/allorders");
    },
    onError: (err) => toast.error(err.message),
  });

  return { placeCashOrder, placingCash };
}

export default useCashPayment;
