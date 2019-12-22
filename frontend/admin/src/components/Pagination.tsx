import React from "react";
import { PaginationUIProps } from "../interface/Pagination.interface";

function Pagination(props: PaginationUIProps) {
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <a
            className="page-link"
            href="javascript:void"
            onClick={props.toPrev}
          >
            Previous
          </a>
        </li>
        {props.renderItems()}
        <li className="page-item">
          <a
            className="page-link"
            href="javascript:void"
            onClick={props.toNext}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
