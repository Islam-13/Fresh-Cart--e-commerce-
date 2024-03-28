import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAddress as deleteAddressApi } from "../../services/apiProducts";
import toast from "react-hot-toast";

function useDeleteAddress() {
  const queryClient = useQueryClient();
  const { mutate: deleteAddress, isPending: isDeleting } = useMutation({
    mutationFn: deleteAddressApi,
    onSuccess: () => {
      toast.success("Address deleted successfully");
      queryClient.invalidateQueries("addresses");
    },
    onError: (err) => toast.error(err.message),
  });
  return { deleteAddress, isDeleting };
}

export default useDeleteAddress;
