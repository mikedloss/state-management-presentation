import { createFileRoute } from '@tanstack/react-router'
import { createContext, useContext } from 'react'

export const Route = createFileRoute('/usecontext/fail-loudly')({
  component: RouteComponent,
})

const SomeContext = createContext<string | null>(null)

function RouteComponent() {
  return (
    <div className='flex flex-col'>
      <SomeContext.Provider value='hello world'>
        <DisplayOne />
        <DisplayTwo />
      </SomeContext.Provider>
    </div>
  )
}

function DisplayOne() {
  const value = useSomeContext()

  return <p>display one: {value ?? 'undefined'}</p>
}

function DisplayTwo() {
  const value = useSomeContext()

  return <p>display two: {value ?? 'undefined'}</p>
}

// ----------------------

function useSomeContext() {
  const value = useContext(SomeContext)

  if (!value) {
    throw new Error(
      'useSomeContext must be used within the SomeContext provider',
    )
  }

  return value
}
