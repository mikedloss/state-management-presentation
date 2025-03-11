import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { create } from 'zustand'

export const Route = createFileRoute('/thirdparty/zustand')({
  component: RouteComponent,
})

type CountStore = {
  count: number
  increment: () => void
  decrement: () => void
}

const useCountStore = create<CountStore>(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
}))

function RouteComponent() {
  return (
    <div className='flex flex-col gap-2'>
      <Counter />
      <ChildOne />
      <ChildTwo />
    </div>
  )
}

function Counter() {
  const increment = useCountStore(state => state.increment)
  const decrement = useCountStore(state => state.decrement)
  return (
    <div className='flex gap-2'>
      <Button onClick={increment}>increment</Button>
      <Button onClick={decrement}>decrement</Button>
    </div>
  )
}

function ChildOne() {
  return (
    <div>
      <p>child one, not using count</p>
    </div>
  )
}

function ChildTwo() {
  const count = useCountStore(state => state.count)
  return (
    <div>
      <p>child two, count: {count}</p>
    </div>
  )
}
