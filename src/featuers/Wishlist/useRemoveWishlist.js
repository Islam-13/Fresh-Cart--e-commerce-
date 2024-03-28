import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWishlistItem as deleteWishlistItemApi } from "../../services/apiProducts";
import toast from "react-hot-toast";

function useRemoveWishlist() {
  const queryClient = useQueryClient();
  const { mutate: removeWishlistItem, isPending: isDeleteing } = useMutation({
    mutationFn: deleteWishlistItemApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries("wishlist");
    },
    onError: (err) => toast.error(err.message),
  });
  return { removeWishlistItem, isDeleteing };
}

export default useRemoveWishlist;
