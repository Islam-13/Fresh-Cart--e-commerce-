import { useQuery } from "@tanstack/react-query";

function useGetData(fn, key, enabled = true) {
  const { data, isLoading, refetch } = useQuery({
    queryFn: fn,
    queryKey: key,
    retry: false,
    enabled,
  });

  return { data, isLoading, refetch };
}

export default useGetData;
