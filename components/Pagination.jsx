import React from "react";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className='join'>
      {pages.map((page, index) => {
        return (
          <button
            className={`btn border-[2px] border-[#585859] hover:bg-[#585859] transition-all ease-in-out duration-300 text-white mr-[10px]`}
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
