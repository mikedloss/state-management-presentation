import { Button } from '@/components/ui/button'
import { userQueryOptions } from '@/lib/options'
import { queryClient } from '@/main'
import { User } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/thirdparty/tanstack-query')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UserList />
}

function UserList() {
  const { data, isPending, isFetching, error, ...other } =
    useQuery<User[]>(userQueryOptions)

  // Show loading state only for initial load, but show a fetching indicator when refreshing
  if (isPending) return <div>Loading...</div>

  console.log({ data, isPending, isFetching, error, ...other })

  return (
    <>
      <h2 className='text-xl font-bold mb-4'>User List Page</h2>
      <div className='mb-2'>
        {isFetching && (
          <span className='text-blue-500 mr-2'>Refreshing...</span>
        )}
        <Button
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
          }}
        >
          Refresh Users
        </Button>
      </div>

      <div className='my-4'>
        {data?.map(user => (
          <div key={user.id} className='p-2 border-b'>
            {user.name}
          </div>
        ))}
      </div>

      <div className='mt-4'>
        <Link
          to='/thirdparty/tanstack-query-two'
          className='font-bold underline'
        >
          Go to second page (uses same query cache)
        </Link>
      </div>
    </>
  )
}
