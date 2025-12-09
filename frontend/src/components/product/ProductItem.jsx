import React from "react";
import { Link } from "react-router-dom"

const ProductItem = ({ product }) => {
    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={product?.image?.[0]?.url}
                    alt={product?.name}
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />
                <div className="card-body ps-3 d-flex justify-content-center flex-column">
                    <h5 className="card-title">
                        <Link to={`/product/${product?._id}`}>{product?.name}</Link>
                    </h5>
                    <div className="ratings mt-auto d-flex align-items-center">
                        <div className="star-ratings" style={{ display: 'flex', gap: '2px' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    style={{
                                        color: star <= (product?.rating || 0) ? '#ffb829' : '#ddd',
                                        fontSize: '22px'
                                    }}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <span id="no_of_reviews" className="pt-2 ps-2">
                            ({product?.numOfReviews || 0})
                        </span>
                    </div>
                    <p className="card-text mt-2">${product?.price || "0.00"}</p>
                    <Link to={`/product/${product?._id}`} id="view_btn" className="btn btn-primary">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;