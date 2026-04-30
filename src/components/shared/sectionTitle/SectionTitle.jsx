import React from "react";
import PropTypes from "prop-types";

const SectionTitle = ({ title, className = "text-white" }) => {
  return (
    <h2
      className={`text-[clamp(1.6rem,3vw,2rem)] font-medium mb-5 ${className}`}
    >
      {title}
    </h2>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SectionTitle;
