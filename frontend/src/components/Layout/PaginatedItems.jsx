import React, {useState, useEffect} from 'react'
import ReactPaginate from 'react-paginate';

const PaginatedItems = ({productsPerPage,products}) => {

    // Here we use item offsets; we could also use page offsets

  const [productOffset, setProductOffset] = useState(0);

  // Simulate fetching products from another resources.
  // (This could be products from props; or products loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = productOffset + productsPerPage;

  const currentProducts = products.slice(productOffset, endOffset);
  const pageCount = Math.ceil(products.length / productsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * productsPerPage) % products.length;
    setProductOffset(newOffset);
  };
  return (
   <>
   <div className='d-flex.justify-content-center mt-5'>
   <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
   


   </div>

   </>
     )
}

export default PaginatedItems