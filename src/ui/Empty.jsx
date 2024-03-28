function Empty({ children }) {
  return (
    <div className="d-flex flex-column justify-content-center">
      <h4 className="alert alert-warning text-center w-50 m-auto">
        {children}
      </h4>
    </div>
  );
}

export default Empty;
