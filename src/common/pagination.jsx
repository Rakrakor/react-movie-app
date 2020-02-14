import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize); // Math.ceil converts floating point to Higher Integer
  const totalNbPages = _.range(1, pagesCount + 1);

  if (totalNbPages === 1) {
    return null;
  }
  /* ou bien
  if (pagesCount === 1) {
    return null;
  }
*/
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {totalNbPages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>{" "}
          </li>
        ))}
      </ul>
    </nav>
  );
};

//Complete List of type checking go to: https://reactjs.org/docs/typechecking-with-proptypes.html
pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default pagination;
