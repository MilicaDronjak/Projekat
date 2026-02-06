import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../../helpers/helpers";

const Filters = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has("min")) setMin(searchParams.get("min"));
    if (searchParams.has("max")) setMax(searchParams.get("max"));
  }, [searchParams]);

  const handleButtonClick = (e) => {
    e.preventDefault();
    let newSearchParams = getPriceQueryParams(searchParams, "min", min);
    newSearchParams = getPriceQueryParams(newSearchParams, "max", max);
    setSearchParams(newSearchParams);
  };

  return (
    <div className="border p-3 filter">
      <h3>Price Filter</h3>

      <form onSubmit={handleButtonClick}>
        <div className="row align-items-end g-2">
  <div className="col-4">
    <input
      type="number"
      className="form-control"
      placeholder="Min ($)"
      value={min}
      onChange={(e) => setMin(e.target.value)}
      style={{ fontSize: "14px" }}
    />
  </div>

  <div className="col-4">
    <input
      type="number"
      className="form-control"
      placeholder="Max ($)"
      value={max}
      onChange={(e) => setMax(e.target.value)}
      style={{ fontSize: "14px" }}
    />
  </div>

  <div className="col-3">
    <button
      type="submit"
      className="btn w-100 text-white"
      style={{
        backgroundColor: "#ff7a00",
        height: "38px",
        fontSize: "14px"
      }}
    >
      GO
    </button>
  </div>
</div>
      </form>
    </div>
  );
};

export default Filters;