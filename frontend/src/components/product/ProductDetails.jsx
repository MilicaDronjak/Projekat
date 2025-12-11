import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/api/productApi";
import { toast } from "react-hot-toast";
import Loader from "../layout/Loader";

const ProductDetails = () => {
    const params = useParams();
    const { data, isLoading, error, isError } = useGetProductDetailsQuery(params?.id);
    const product = data?.product;

    const [activeImg, setActiveImg] = useState("/image/mobile-phone.avif");
    const [quantity, setQuantity] = useState(1);

    // Postavi aktivnu sliku kada se product učita
    useEffect(() => {
        if (product?.image && Array.isArray(product.image) && product.image.length > 0) {
            const firstImage = product.image[0];
            if (firstImage?.url) {
                setActiveImg(firstImage.url);
            }
        }
    }, [product]);

    // Toast za greške
    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message || "Something went wrong");
        }
    }, [isError, error]);

    // Funkcije za količinu
    const increaseQty = () => {
        if (product?.stock && quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQty = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    // Filtriraj samo slike koje imaju URL
    const validImages = product?.image?.filter(img => img?.url) || [];

    return (
        <div className="row d-flex justify-content-around">
            {/* Leva strana - Slike */}
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                {/* Glavna slika */}
                <div className="p-3 border rounded shadow-sm">
                    <img
                        className="d-block w-100 rounded"
                        src={activeImg}
                        alt={product?.name || "Product"}
                        width="340"
                        height="390"
                        onError={(e) => {
                            e.target.src = "/image/mobile-phone.avif";
                        }}
                    />
                </div>

                {/* Thumbnail galerija */}
                {validImages.length > 0 && (
                    <div className="row justify-content-start mt-4">
                        <div className="col-12">
                            <div className="d-flex flex-wrap gap-3">
                                {validImages.map((img, index) => (
                                    <div
                                        key={img?.id || index}
                                        className="thumbnail-wrapper"
                                        onClick={() => setActiveImg(img.url)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <img
                                            className={`thumbnail-img rounded border p-2 ${activeImg === img.url ? 'border-warning border-3' : 'border-secondary'}`}
                                            src={img.url}
                                            height="80"
                                            width="80"
                                            alt={`${product?.name || "Product"} - view ${index + 1}`}
                                            onError={(e) => {
                                                e.target.src = "/image/mobile-phone.avif";
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Desna strana - Detalji */}
            <div className="col-12 col-lg-5 mt-5">
                {/* Naziv i ID */}
                <h3 className="fw-bold">{product?.name}</h3>
                <p id="product_id" className="text-muted">
                    Product ID: <strong>{product?._id || product?.id}</strong>
                </p>

                <hr />

                {/* Ocena */}
                <div className="d-flex align-items-center mb-3">
                    <div className="star-ratings">
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
                    <span id="no-of-reviews" className="ps-2">
                        ({product?.numOfReviews || 0} Reviews)
                    </span>
                </div>

                <hr />

                {/* Cena */}
                <h4 className="text-primary fw-bold mb-4">
                    ${product?.price?.toFixed(2) || "0.00"}
                </h4>

                {/* Količina i dodaj u korpu */}
                <div className="d-flex align-items-center mb-4">
                    <div className="stockCounter me-3">
                        <button 
                            className="btn btn-outline-secondary btn-sm minus" 
                            onClick={decreaseQty}
                            disabled={quantity <= 1}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            className="form-control text-center mx-2 count"
                            value={quantity}
                            readOnly
                            style={{ width: '60px', display: 'inline-block' }}
                        />
                        <button 
                            className="btn btn-outline-secondary btn-sm plus" 
                            onClick={increaseQty}
                            disabled={product?.stock && quantity >= product.stock}
                        >
                            +
                        </button>
                    </div>
                    
                    <button
                        type="button"
                        id="cart_btn"
                        className="btn btn-primary btn-lg"
                        disabled={!product?.stock || product.stock === 0}
                    >
                        <i className="fa fa-shopping-cart me-2"></i>
                        Add to Cart
                    </button>
                </div>

                {/* Status */}
                <div className="mb-4">
                    <p className="mb-1">
                        Status: <span 
                            className={`fw-bold ${product?.stock > 0 ? "text-success" : "text-danger"}`}
                        >
                            {product?.stock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                    </p>
                </div>

                <hr />

                {/* Opis */}
                <div className="mb-4">
                    <h5 className="mb-3">Description:</h5>
                    <p className="text-justify" style={{ lineHeight: '1.6' }}>
                        {product?.description || "No description available."}
                    </p>
                </div>

                <hr />

                {/* Prodavac */}
                <div className="mb-4">
                    <p className="mb-2">
                        <strong>Sold by:</strong> {product?.seller || "Unknown Seller"}
                    </p>
                </div>

                <hr />

                {/* Recenzije - login prompt */}
                <div className="alert alert-info mt-4">
                    <div className="d-flex align-items-center">
                        <i className="fa fa-info-circle me-3 fs-4"></i>
                        <div>
                            <h6 className="alert-heading mb-1">Want to share your thoughts?</h6>
                            <p className="mb-0">
                                Login to post your review.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Dugme za recenzije */}
                <div className="mt-4">
                    <button
                        type="button"
                        className="btn btn-outline-primary w-100"
                        onClick={() => toast("Please login to post a review")}
                    >
                        <i className="fa fa-star me-2"></i>
                        Write a Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;