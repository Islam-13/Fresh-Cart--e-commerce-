import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartItem } from "../../services/apiCart";
import toast from "react-hot-toast";

function useDeleteCartItem() {
  const queryClient = useQueryClient();
  const { mutate: deleteItem, isPending: isDeleting } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { deleteItem, isDeleting };
}

export default useDeleteCartItem;
