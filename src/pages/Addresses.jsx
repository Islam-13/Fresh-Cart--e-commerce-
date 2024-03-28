import { Helmet } from "react-helmet-async";
import useGetData from "../Hook/useGetData";
import { getAddresses } from "../services/apiProducts";
import Loader from "../ui/Loader";
import Modal from "../ui/Modal";
import NewAddressForm from "../featuers/addresses/NewAddressForm";
import AddressItem from "../featuers/addresses/AddressItem";
import Empty from "../ui/Empty";

function Addresses() {
  const { data, isLoading } = useGetData(getAddresses, ["addresses"]);

  if (isLoading) return <Loader />;

  return (
    <Modal>
      <div className="container py-5">
        <Helmet>
          <title>Fresh Cart | Addresses</title>
        </Helmet>
        <div className="d-flex justify-content-between mb-3">
          <h4>Your Addresses :</h4>
          <Modal.Open opens="newAddress">
            <button className="btn text-white bg-main">
              <i className="fa-solid fa-plus"></i> New Address
            </button>
          </Modal.Open>

          <Modal.Window name="newAddress">
            <NewAddressForm />
          </Modal.Window>
        </div>
        {data?.results === 0 && (
          <Empty>
            Your address list is empty, let's add a new address now!! 🤔
          </Empty>
        )}
        {data?.results > 0 && (
          <div className="row g-3">
            {data?.data?.map((address) => (
              <AddressItem key={address._id} address={address} />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}

export default Addresses;
