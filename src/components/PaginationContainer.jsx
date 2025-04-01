import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'

const PaginationContainer = () => {
  const { meta } = useLoaderData()
  const { pageCount, page } = meta.pagination

  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1
  })
  const { search, pathname } = useLocation()
  console.log(search)
  console.log(pathname)
  const navigate = useNavigate()

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', pageNumber)
    // re-navigate without overiding the search params
    console.log(searchParams.toString())
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  // if only one page do not display
  if (pageCount < 2) return null
  // SORT THE DUMMY DATA FIRST
  return (
    <div className='mt-16 flex justify-end'>
      {/* JOIN IS DAISY UI */}
      <div className='join'>
        {/* PREV BTN */}
        <button
          className='btn btn-xs sm:btn-md join-item'
          onClick={() => {
            // whatever the page is -1
            let prevPage = page - 1
            if (prevPage < 1) prevPage = pageCount
            handlePageChange(prevPage)
          }}
        >
          Prev
        </button>
        {/* DYNAMIC */}
        {pages.map((pageNumber) => {
          return (
            <button
              onClick={() => handlePageChange(pageNumber)}
              key={pageNumber}
              // change active button
              className={`btn btn-xs sm:btn-md border-none join-item ${
                pageNumber === page ? 'bg-base-300 border-base-300' : ''
              }`}
            >
              {pageNumber}
            </button>
          )
        })}
        {/* NEXT BTN */}
        <button
          className='btn btn-xs sm:btn-md join-item'
          onClick={() => {
            let nextPage = page + 1
            if (nextPage > pageCount) nextPage = 1
            handlePageChange(nextPage)
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}
export default PaginationContainer
