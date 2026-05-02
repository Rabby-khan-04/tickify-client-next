"use client";

import { FaChevronLeft, FaAngleRight } from "react-icons/fa6";

const Pagination = ({ currentPage = 0, setCurrentPage, totalPage = 0 }) => {
  if (!totalPage || totalPage <= 1) return null;

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPage - 1));
  };

  const getVisiblePages = () => {
    // Show max 5 pages on mobile, more on desktop handled via CSS
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(0, currentPage - delta);
      i <= Math.min(totalPage - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Add first page + dots if needed
    if (range[0] > 0) {
      rangeWithDots.push(0);
      if (range[0] > 1) rangeWithDots.push("...");
    }

    rangeWithDots.push(...range);

    // Add dots + last page if needed
    if (range[range.length - 1] < totalPage - 1) {
      if (range[range.length - 1] < totalPage - 2) rangeWithDots.push("...");
      rangeWithDots.push(totalPage - 1);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-stretch justify-center mt-10 gap-1 sm:gap-4 flex-wrap">
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
      {visiblePages.map((item, index) =>
        item === "..." ? (
          <span
            key={`dots-${index}`}
            className="btn-pagination bg-transparent text-white pointer-events-none"
          >
            ...
          </span>
        ) : (
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
        ),
      )}

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

export default Pagination;
