import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAddress as addAddressApi } from "../../services/apiProducts";
import toast from "react-hot-toast";

function useAddAddress() {
  const queryClient = useQueryClient();
  const { mutate: addAddress, isPending: isAdding } = useMutation({
    mutationFn: addAddressApi,
    onSuccess: () => {
      queryClient.invalidateQueries("addresses");
      toast.success("Address added successfully");
    },
    onError: (err) => toast.error(err.message),
  });
  return { addAddress, isAdding };
}

export default useAddAddress;
