import { Helmet } from "react-helmet-async";
import { getProductsCart } from "../services/apiCart";
import { formatCurrency } from "../utils/helpers";
import useGetData from "../Hook/useGetData";
import useClearCart from "../featuers/cart/useClearCart";
import useDeleteCartItem from "../featuers/cart/useDeleteCartItem";
import useUpdateCart from "../featuers/cart/useUpdateCart";
import useOnlinePayment from "../featuers/cart/useOnlinePayment";
import useCashPayment from "../featuers/cart/useCashPayment";

import emptyCart from "../assets/images/empty-cart.png";
import Loader from "../ui/Loader";
import Modal from "../ui/Modal";
import ConfirmDelete from "../ui/ConfirmDelete";
import PaymentForm from "../ui/PaymentForm";
import CartProduct from "../featuers/cart/CartProduct";

export default function Cart() {
  const { data, isLoading } = useGetData(getProductsCart, ["cart"]);
  const { clearCart, isClearing } = useClearCart();
  const { deleteItem, isDeleting } = useDeleteCartItem();
  const { updateItem, isUpdating } = useUpdateCart();
  const { placeOnlineOrder, placingOnline } = useOnlinePayment();
  const { placeCashOrder, placingCash } = useCashPayment();

  if (isLoading) return <Loader />;

  return (
    <Modal>
      <div className="container my-5">
        <Helmet>
          <title>Fresh Cart | Cart</title>
        </Helmet>
        {data?.numOfCartItems > 0 ? (
          <>
            <Modal.Open opens="clear-cart">
              <button className="btn btn-outline-danger d-block ms-auto">
                Clear Cart
              </button>
            </Modal.Open>

            <Modal.Window name="clear-cart">
              <ConfirmDelete
                func={clearCart}
                funcLoad={isClearing}
                action="clear cart"
              />
            </Modal.Window>

            {data.data?.products?.map((product) => (
              <CartProduct
                key={product.product.id}
                product={product}
                onDelete={() => deleteItem(product.product.id)}
                isDeleting={isDeleting}
                updateItem={updateItem}
                isUpdating={isUpdating}
              />
            ))}

            <div className="d-flex gap-3 justify-content-between mt-5">
              <div className="d-flex gap-3">
                <Modal.Open opens="online-payment">
                  <button className="btn bg-main text-white">
                    Online Payment <i className="fa-regular fa-credit-card"></i>
                  </button>
                </Modal.Open>

                <Modal.Open opens="cash-payment">
                  <button className="btn bg-body-secondary">
                    Cash on Delivery{" "}
                    <i className="fa-solid fa-money-bill-wave"></i>
                  </button>
                </Modal.Open>
              </div>

              <Modal.Window name="online-payment">
                <PaymentForm
                  id={data?.data?._id}
                  fnc={placeOnlineOrder}
                  loadfunc={placingOnline}
                />
              </Modal.Window>

              <Modal.Window name="cash-payment">
                <PaymentForm
                  id={data?.data?._id}
                  fnc={placeCashOrder}
                  loadfunc={placingCash}
                />
              </Modal.Window>

              <p>
                Total cart Price:{" "}
                <span className=" fw-bolder">
                  {" "}
                  {formatCurrency(data?.data?.totalCartPrice)}
                </span>
              </p>
            </div>
          </>
        ) : (
          <div className="d-flex flex-column justify-content-center">
            <h2 className="alert alert-warning text-center w-75 m-auto">
              Your cart is currently empty!!
            </h2>
            <img src={emptyCart} alt="" height={350} className="w-50 m-auto" />
          </div>
        )}
      </div>
    </Modal>
  );
}
