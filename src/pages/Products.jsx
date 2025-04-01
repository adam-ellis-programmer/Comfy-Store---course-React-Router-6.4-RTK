import { Filters, PaginationContainer, ProductsContainer } from '../components'
import { customFetch } from '../utils'

const url = '/products'
// (data) -> data.request
//
export const loader = async ({ request }) => {
  // const params = new URL(request.url).searchParams
  // const search = params.get('search')
  // search params returns an empty array like the entries object
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ])
  console.log(params)
  const response = await customFetch(url, {
    params,
  })
  const products = response.data.data
  const meta = response.data.meta
  // console.log(request)
  return { products, meta, params }
}

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  )
}
export default Products
