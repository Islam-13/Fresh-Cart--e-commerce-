function ConfirmDelete({ action, func, funcLoad, onCloseModal }) {
  return (
    <div className="border py-4 px-5 rounded-4 bg-white shadow">
      <h1 className="text-capitalize">{action}?</h1>
      <p>Are you sure you want to {action}? This action cannot be undone.</p>
      <div className="d-flex justify-content-end gap-3">
        <button
          disabled={funcLoad}
          onClick={onCloseModal}
          className="btn border"
        >
          Cancel
        </button>
        <button disabled={funcLoad} onClick={func} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
