import { expensiveCalculation } from '../../helpers/calc'
import { User } from '../../types'
import { Button } from '@/components/ui/button'
import { createFileRoute, ReactNode } from '@tanstack/react-router'
import { createContext, useContext, useEffect, useState } from 'react'

export const Route = createFileRoute('/usecontext/provider-hell')({
  component: RouteComponent,
})

const ValueContext = createContext<{
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
}>({ value: 0, setValue: () => null })
const UserContext = createContext<{
  isLoading: boolean
  error: string | null
  user: User | null
  fetchData?: (id?: string) => void
}>({ isLoading: false, error: null, user: null })
const AnotherContext = createContext(null)
const FooContext = createContext(null)
const BarContext = createContext(null)

function RouteComponent() {
  return (
    <SomeLayout>
      <ValueContextProvider>
        <UserContextProvider>
          <AnotherContext.Provider value={null}>
            <FooContext.Provider value={null}>
              <BarContext.Provider value={null}>
                <ValueDisplay />
                <UserDisplay />
                <CompanyFibonacciDisplay />
              </BarContext.Provider>
            </FooContext.Provider>
          </AnotherContext.Provider>
        </UserContextProvider>
      </ValueContextProvider>
    </SomeLayout>
  )
}

function ValueContextProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<number>(0)

  return (
    <ValueContext.Provider value={{ value, setValue }}>
      {children}
    </ValueContext.Provider>
  )
}

function UserContextProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async (id?: string) => {
    console.log('fetching user data')
    try {
      setIsLoading(true)

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id ?? 1}`,
      )
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()

      setUserData(data)
      setError(null)
    } catch (err: unknown) {
      setError(
        `Error fetching data: ${err instanceof Error ? err.message : 'Unknown error'}`,
      )
      console.error('Fetch error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log('user data effect')
    fetchData()
  }, [])
  return (
    <UserContext.Provider
      value={{ isLoading, error, user: userData, fetchData }}
    >
      {children}
    </UserContext.Provider>
  )
}

function SomeLayout({ children }: { children: ReactNode }) {
  console.log('Some layout is rendering...')

  return <div className='border-8 border-red-500 p-4'>{children}</div>
}

function ValueDisplay() {
  const { value, setValue } = useContext(ValueContext)

  const handleChangeValueButtonPress = () => {
    setValue(prev => (prev += 1))
  }
  return (
    <div className='flex flex-col gap-2 items-start mb-4'>
      <p>current value: {value}</p>
      <Button onClick={handleChangeValueButtonPress}>+1</Button>
    </div>
  )
}

function UserDisplay() {
  const { isLoading, error, user, fetchData } = useContext(UserContext)

  const handleNewUserButtonPress = () => {
    if (user) {
      const existingId = user.id
      const newId = (existingId + 1).toString()
      fetchData?.(newId)
    }
  }

  return (
    <div className='flex flex-col gap-2 items-start mb-4'>
      {error && <p>Error!</p>}
      {isLoading && <p>Loading...</p>}
      {user && <p>email: {user.email}</p>}
      <Button onClick={handleNewUserButtonPress}>refetch</Button>
    </div>
  )
}

function CompanyFibonacciDisplay() {
  const { user } = useContext(UserContext)

  const fibonacciNumber = expensiveCalculation()

  if (!user) {
    return <p>nothing here</p>
  }

  return (
    <div>
      <p>company name: {user.company.name}</p>
      <p>fibonacci 40: {fibonacciNumber}</p>
    </div>
  )
}
