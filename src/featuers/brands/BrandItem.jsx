function BrandItem({ brand }) {
  return (
    <div className="col-md-3">
      <div className="product cursor-pointer">
        <img src={brand?.image} className="w-100" alt="" />
      </div>
    </div>
  );
}

export default BrandItem;
