import { useSearchParams } from "react-router-dom";

function Pagination({ count }) {
  const btns = [];
  for (let i = 0; i < count; i++) {
    btns.push(i);
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const current = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  return (
    <div className="d-flex justify-content-end gap-1 align-items-center mb-3">
      <button
        className="btn bg-main text-white"
        disabled={current === 1}
        onClick={() => {
          searchParams.set("page", current - 1);
          setSearchParams(searchParams);
        }}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      {btns.map((btn) => (
        <button
          key={btn}
          onClick={() => {
            searchParams.set("page", btn + 1);
            setSearchParams(searchParams);
          }}
          className={`btn ${current === btn + 1 ? "active-page" : ""}`}
        >
          {btn + 1}
        </button>
      ))}

      <button
        className="btn bg-main text-white"
        disabled={current === count}
        onClick={() => {
          searchParams.set("page", current + 1);
          setSearchParams(searchParams);
        }}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
}

export default Pagination;
