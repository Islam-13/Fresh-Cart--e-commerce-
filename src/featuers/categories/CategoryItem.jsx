function CategoryItem({ cat }) {
  return (
    <div className="col-md-3">
      <div className="product cursor-pointer height-cat">
        <img src={cat?.image} className="w-100 h-100" alt="" />
      </div>
    </div>
  );
}

export default CategoryItem;
