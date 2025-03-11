import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className='p-2 flex flex-col'>
      <h1 className='text-2xl font-bold mb-4'>Demos</h1>
      <h2 className='text-xl font-bold mt-2'>useState</h2>
      <div className='flex flex-col gap-1 w-fit'>
        <Link to='/usestate/functional-updater'>Functional updater</Link>
        <Link to='/usestate/props-as-state'>Props as State</Link>
      </div>
      <h2 className='text-xl font-bold mt-2'>Context</h2>
      <div className='flex flex-col gap-1 w-fit'>
        <Link to='/usecontext/fail-loudly'>Fail loudly</Link>
        <Link to='/usecontext/provider-hell'>Provider hell</Link>
      </div>
      <h2 className='text-xl font-bold mt-2'>Third party</h2>
      <div className='flex flex-col gap-1 w-fit'>
        <Link to='/thirdparty/zustand'>Zustand</Link>
        <Link to='/thirdparty/jotai'>Jotai</Link>
        <Link to='/thirdparty/tanstack-query'>Tanstack Query</Link>
        <Link to='/thirdparty/react-hook-form'>React Hook Form</Link>
        <Link to='/thirdparty/xstate'>XState</Link>
      </div>
    </div>
  )
}
