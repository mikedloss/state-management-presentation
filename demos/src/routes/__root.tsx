import {
  Link,
  Outlet,
  createRootRoute,
  useRouterState,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ArrowLeftIcon } from 'lucide-react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const routerState = useRouterState()
  const isHomePage = routerState.location.pathname === '/'
  return (
    <>
      {!isHomePage && (
        <div className='p-2 flex gap-2 text-lg'>
          <Link
            to='/'
            className='flex gap-2 items-center hover:underline'
            activeProps={{
              className: 'font-bold',
            }}
          >
            <ArrowLeftIcon className='w-4 h-4' /> Back to home
          </Link>
        </div>
      )}
      <div className='p-2'>
        <Outlet />
      </div>
      <TanStackRouterDevtools position='bottom-right' />
    </>
  )
}
