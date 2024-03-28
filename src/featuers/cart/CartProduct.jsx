import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

export default function CartProduct({
  product,
  isDeleting,
  onDelete,
  isUpdating,
  updateItem,
}) {
  function handleIncrease() {
    product.count < product.product.quantity &&
      updateItem({ id: product.product.id, count: product.count + 1 });
  }

  function handleDecrease() {
    product.count > 1
      ? updateItem({ id: product.product.id, count: product.count - 1 })
      : onDelete();
  }

  return (
    <Modal>
      <div className="cart-product shadow rounded-2 my-3 px-3">
        <div className="row align-items-center">
          <div className="col-md-2">
            <Link to={`/products/${product.product.id}`}>
              <img className="w-100" src={product.product.imageCover} alt="" />
            </Link>
          </div>
          <div className="col-md-8">
            <h4>{product.product.title}</h4>
            <h6 className="text-main">{product.product.category?.name}</h6>
            <p className="d-flex justify-content-between">
              <span>{formatCurrency(product.price)} </span>
              <span>
                <i className=" fas fa-star rating-color me-1"></i>{" "}
                {product.product.ratingsAverage}
              </span>
            </p>
            <p>
              <span className="fw-bolder">Total Price: </span>
              {formatCurrency(product.price * product.count)}
            </p>
          </div>
          <div className="col-md-2 text-center">
            <Modal.Open opens="confirm-delete">
              <button className="btn text-danger">Remove</button>
            </Modal.Open>

            <Modal.Window name="confirm-delete">
              <ConfirmDelete
                func={onDelete}
                funcLoad={isDeleting}
                action="delete product"
              />
            </Modal.Window>

            <div className="d-flex align-items-center justify-content-center mb-2">
              <button
                onClick={handleDecrease}
                disabled={isUpdating}
                className="btn bg-main text-white mx-2 rounded-5 fw-bolde"
              >
                -
              </button>
              <span>{product.count}</span>
              <button
                onClick={handleIncrease}
                disabled={isUpdating}
                className="btn bg-main text-white mx-2 rounded-5 fw-bolde"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
