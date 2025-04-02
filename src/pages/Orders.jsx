import { redirect, useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import { customFetch } from '../utils'
import {
  ComplexPaginationContainer,
  OrdersList,
  PaginationContainer,
  SectionTitle,
} from '../components'

export const ordersQuery = (params, user) => {
  return {
    // invalidate query for fresh data
    // when the userName change also
    queryKey: [
      'orders',
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    // return the custom fetch
    queryFn: () =>
      customFetch.get('/orders', {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  }
}

//  prettier-ignore
export const loader = (store, queryClient) => async ({ request }) => {
    const user = store.getState().userState.user

    if (!user) {
      toast.warn('You must be logged in to view orders')
      return redirect('/login')
    }

    // for pagination page numbers (dynamic)
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])

    try {
      // const response = await customFetch.get('/orders', {
      //   params,
      //   headers: {
      //     Authorization: `Bearer ${user.token}`,
      //   },
      // })

      const response = await queryClient.ensureQueryData( ordersQuery(params, user));

      // console.log(response)
      return { orders: response.data.data, meta: response.data.meta }
    } catch (error) {
      console.log(error)
      const errorMessage = error?.response?.data?.error?.message || 'there was an error accessing your orders'
      toast.error(errorMessage)
      if (error?.response?.status === 401 || 403) return redirect('/login')
      return null
    }
  }
const Orders = () => {
  const { meta } = useLoaderData()

  if (meta.pagination.total < 1) {
    return <SectionTitle text='Please make an order' />
  }

  return (
    <>
      <SectionTitle text='Your Orders' />
      <OrdersList />
      {/* <PaginationContainer /> */}
      <ComplexPaginationContainer />
    </>
  )
}
export default Orders
