import { formatCurrency } from "../../utils/helpers";

function OrderItem({ order }) {
  const { id, cartItems, totalOrderPrice, paymentMethodType } = order;

  return (
    <div className="col-md-10">
      <div className="order-box border shadow rounded p-3">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Order #{id}</h5>
          <p className="mb-0">
            Payment method :{" "}
            <span className=" text-capitalize bg-main text-white rounded p-1">
              {paymentMethodType}
            </span>
          </p>
        </div>
        <p>you have ordered {cartItems.length} items</p>
        <div className="d-flex flex-wrap gap-3">
          {cartItems.map((item) => (
            <img
              key={item._id}
              src={item.product.imageCover}
              alt={item.product.title}
              width={150}
              height={150}
              className="border rounded"
            />
          ))}
        </div>
        <hr />

        <p className="mb-0">
          Total amount:{" "}
          <span className="fw-semibold">{formatCurrency(totalOrderPrice)}</span>
        </p>
      </div>
    </div>
  );
}

export default OrderItem;
