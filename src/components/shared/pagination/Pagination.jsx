"use client";

import { FaChevronLeft, FaAngleRight } from "react-icons/fa6";
import PropTypes from "prop-types";

const Pagination = ({ currentPage = 0, setCurrentPage, totalPage = 0 }) => {
  if (!totalPage || totalPage <= 1) return null;

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPage - 1));
  };

  return (
    <div className="flex items-stretch justify-center mt-10 gap-4">
      {/* Prev */}
      <button
        className={`btn-pagination bg-primary/10 text-white ${
          currentPage === 0 ? "pointer-events-none opacity-50" : ""
        }`}
        onClick={handlePrev}
      >
        <FaChevronLeft />
      </button>

      {/* Pages */}
      {Array.from({ length: totalPage }).map((_, item) => (
        <button
          key={item}
          onClick={() => setCurrentPage(item)}
          className={`btn-pagination ${
            currentPage === item
              ? "bg-white text-dark"
              : "bg-primary/10 text-white"
          }`}
        >
          {item + 1}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={handleNext}
        className={`btn-pagination bg-primary/10 text-white ${
          currentPage === totalPage - 1 ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func.isRequired,
  totalPage: PropTypes.number,
};

export default Pagination;
