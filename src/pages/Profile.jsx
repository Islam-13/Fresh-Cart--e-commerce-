import { Helmet } from "react-helmet-async";

function Profile() {
  const { name, email } = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container py-5">
      <Helmet>
        <title>Fresh Cart | Profile</title>
      </Helmet>
      <div className="row">
        <div className="col-md-10">
          <h4>Profile Info</h4>
          <div className="profile-box border shadow p-3 rounded">
            <div className="mt-3">
              <div className="d-flex">
                <p className="mb-2 basis fw-semibold">Name</p>
                <span className="me-2 fw-bolder">:</span>
                <p className="mb-2">{name}</p>
              </div>
              <div className="d-flex">
                <p className="mb-2 basis fw-semibold">Email</p>
                <span className="me-2 fw-bolder">:</span>
                <p className="mb-2 ">{email}</p>
              </div>
              <div className="d-flex">
                <p className="mb-2 basis fw-semibold">Phone</p>
                <span className="me-2 fw-bolder">:</span>
                <p className="mb-2">phone</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
