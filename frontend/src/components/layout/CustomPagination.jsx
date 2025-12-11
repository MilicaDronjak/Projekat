import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";

const CustomPagination = ({ resPerPage, filteredProductsCount }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const page = Number(searchParams.get("page")) || 1;
    const pageCount = Math.ceil(filteredProductsCount / resPerPage);

    useEffect(() => {
        setCurrentPage(page);
    }, [page]);

    // ReactPaginate vraća objekat sa selected property
    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1; // ReactPaginate počinje od 0
        setCurrentPage(selectedPage);
        
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("page", selectedPage);
        navigate(`${location.pathname}?${newSearchParams.toString()}`);
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            {filteredProductsCount > resPerPage && (
                <div className="pagination-wrapper">
                    <ReactPaginate
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        forcePage={currentPage - 1} // Obrati pažnju - ovo je za ReactPaginate
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        previousLabel={"Prev"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        containerClassName="pagination"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>
            )}
        </div>
    );
};

export default CustomPagination;