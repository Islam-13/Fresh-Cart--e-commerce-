import { Helmet } from "react-helmet-async";
import { getOrders } from "../services/apiProducts";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import Loader from "../ui/Loader";
import OrderItem from "../featuers/orders/OrderItem";
import Empty from "../ui/Empty";

function Orders() {
  const { id } = jwtDecode(localStorage.getItem("myToken"));
  const { data, isLoading } = useQuery({
    queryFn: () => getOrders(id),
    queryKey: ["orders", id],
  });

  if (isLoading) return <Loader />;

  return (
    <div className="container py-5">
      <Helmet>
        <title>Fresh Cart | Orders</title>
      </Helmet>
      <h4 className="mb-3">Your Orders: {data.length > 0 && data.length}</h4>
      {!data.length && (
        <Empty>
          You havn't order yet, let's make your first order now!! 🤔
        </Empty>
      )}
      <div className="row g-3">
        {data?.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
