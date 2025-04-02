import { Filters, PaginationContainer, ProductsContainer } from '../components'
import { customFetch } from '../utils'

const url = '/products'

/**
 * **- ogical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.
 * **- every time we have a paramater we
 * **- need to add to query key
 *
 * **- for first time we navigate to the page
 * **- we do not have any params
 * **- this is a req we need to cache
 * **- so we use ?? nullish coalescing operator
 *
 *
 *
 */

const allProductsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } = queryParams

  return {
    queryKey: [
      'products',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],

    queryFn: () =>
      customFetch(url, {
        params: queryParams,
      }),
  }
}

// (data) -> data.request
export const loader =
  (queryClient) =>
  async ({ request }) => {
    // const params = new URL(request.url).searchParams
    // const search = params.get('search')
    // search params returns an empty array like the entries object
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])
    console.log(params)
    // const response = await customFetch(url, {
    //   params,
    // })

    const response = await queryClient.ensureQueryData(allProductsQuery(params))

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
