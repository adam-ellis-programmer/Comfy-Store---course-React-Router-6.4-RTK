import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'

const ComplexPaginationContainer = () => {
  const { meta } = useLoaderData()
  const { pageCount, page } = meta.pagination

  const { search, pathname } = useLocation()
  const navigate = useNavigate()
  // handle the search params
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', pageNumber)
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  // creates a button element
  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`btn btn-xs sm:btn-md border-none join-item ${
          activeClass ? 'bg-base-300 border-base-300 ' : ''
        }`}
      >
        {pageNumber}
      </button>
    )
  }

  // note order to render
  // add btns before and after active btn
  // btn count 4 excluding hard coded
  // conditionally render with if statments
  const renderPageButtons = () => {
    const pageButtons = []
    // // first button
    // activeClass: page === 1 does this equal true? then add class
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }))

    // // dots
    if (page > 2) {
      pageButtons.push(
        <button className='join-item btn btn-xs sm:btn-md' key='dots-1'>
          ...
        </button>
      )
    }

    // only show active btn if not first or last active
    // // active/current page
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }))
    }

    // // dots
    if (page < pageCount - 1) {
      pageButtons.push(
        <button className='join-item btn btn-xs sm:btn-md' key='dots-2'>
          ...
        </button>
      )
    }

    // // last button
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    )

    console.log(pageButtons)
    return pageButtons
  }

  if (pageCount < 2) return null

  return (
    <div className='mt-16 flex justify-end'>
      <div className='join'>
        {/* PROEV BTN */}
        <button
          className='btn btn-xs sm:btn-md join-item'
          onClick={() => {
            let prevPage = page - 1
            if (prevPage < 1) prevPage = pageCount
            handlePageChange(prevPage)
          }}
        >
          Prev
        </button>

        {renderPageButtons()}
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
export default ComplexPaginationContainer
