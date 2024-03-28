import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addWishlistItem as addWishlistItemApi } from "../../services/apiProducts";
import toast from "react-hot-toast";

function useAddtoWishlist() {
  const queryClient = useQueryClient();
  const { mutate: addWishlistItem, isPending: isAddingWishlist } = useMutation({
    mutationFn: addWishlistItemApi,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries("wishlist");
    },
    onError: (err) => console.error(err.message),
  });
  return { addWishlistItem, isAddingWishlist };
}

export default useAddtoWishlist;
