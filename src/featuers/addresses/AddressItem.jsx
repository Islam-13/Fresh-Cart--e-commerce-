import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import useDeleteAddress from "./useDeleteAddress";

function AddressItem({ address }) {
  const { _id, name, details, phone, city } = address;
  const { deleteAddress, isDeleting } = useDeleteAddress();

  return (
    <Modal>
      <div className="col-md-10 mx-auto">
        <div className="address-box border shadow p-3 rounded">
          <div>
            <div className="d-flex">
              <p className="mb-2 basis fw-semibold">Name</p>
              <span className="me-2 fw-bolder">:</span>
              <p className="mb-2">{name}</p>
            </div>
            <div className="d-flex">
              <p className="mb-2 basis fw-semibold">Details</p>
              <span className="me-2 fw-bolder">:</span>
              <p className="mb-2 ">{details}</p>
            </div>
            <div className="d-flex">
              <p className="mb-2 basis fw-semibold">Phone</p>
              <span className="me-2 fw-bolder">:</span>
              <p className="mb-2">{phone}</p>
            </div>
            <div className="d-flex">
              <p className="mb-2 basis fw-semibold">City</p>
              <span className="me-2 fw-bolder">:</span>
              <p className="mb-2 ">{city}</p>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <Modal.Open opens="delete-address">
              <button className="btn btn-danger">
                <i className="fa-regular fa-trash-can"></i> Delete
              </button>
            </Modal.Open>
            <Modal.Window name="delete-address">
              <ConfirmDelete
                func={() => deleteAddress(_id)}
                funcLoad={isDeleting}
                action="delete address"
              />
            </Modal.Window>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddressItem;
