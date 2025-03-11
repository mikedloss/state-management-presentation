import { Button } from '@/components/ui/button'
import { userQueryOptions } from '@/lib/options'
import { queryClient } from '@/main'
import { User } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/thirdparty/tanstack-query-two')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isPending, isFetching } = useQuery<User[]>(userQueryOptions)

  return (
    <>
      <h2 className='text-xl font-bold mb-4'>Second Page</h2>

      <div className='mb-4'>
        {isPending && <div>Loading...</div>}
        {isFetching && (
          <span className='text-blue-500 mr-2'>Refreshing...</span>
        )}
      </div>

      <div className='mb-4'>
        <p>Number of users: {data?.length || 0}</p>
        <p className='text-sm text-gray-600 mt-2'>
          This data loaded instantly because it's using the same cache as the
          first page!
        </p>
      </div>

      <div className='flex gap-4'>
        <Button
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
          }}
        >
          Refresh Users
        </Button>

        <Link to='/thirdparty/tanstack-query' className='font-bold underline'>
          Back to first page
        </Link>
      </div>
    </>
  )
}
