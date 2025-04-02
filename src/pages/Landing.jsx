import { FeaturedProducts, Hero } from '../components'

import { customFetch } from '../utils'
// add on the query params returns 3 products
const url = '/products?featured=true'

const featuredProductsQuery = {
  queryKey: ['featuredProducts'],
  // keepn const products the same
  queryFn: () => customFetch(url), // was in the resp await
}

export const loader = (queryClient) => async () => {
  // be explicit in what we return
  // if the data is in chache and is still valid / or make fresh request
  const response = await queryClient.ensureQueryData(featuredProductsQuery)
  console.log(response)
  const products = response.data.data
  return { products }
}

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  )
}
export default Landing
