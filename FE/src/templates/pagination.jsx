export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 py-4">
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
        Prev
      </button>

      {/* {generatePageNumbers().map((page) => (
        <button key={page} onClick={() => handlePageChange(page)} className={`px-4 py-2 border rounded-md ${page === currentPage ? "bg-blue-500 text-white" : "bg-white text-blue-500"} hover:bg-blue-200`}>
          {page}
        </button>
      ))} */}

      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
        Next
      </button>
    </div>
  );
};

export default Pagination;
