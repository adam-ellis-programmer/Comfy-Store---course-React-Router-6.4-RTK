import { FeaturedProducts, Hero } from '../components'

import { customFetch } from '../utils'
// add on the query params returns 3 products
const url = '/products?featured=true'

export const loader = async () => {
  const response = await customFetch(url)
  // be explicit in what we return
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
