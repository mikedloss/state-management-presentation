import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { atom, useAtom, useAtomValue } from 'jotai'

export const Route = createFileRoute('/thirdparty/jotai')({
  component: RouteComponent,
})

const countAtom = atom<number>(0)

// composable atoms
const readOnlyCountAtom = atom(get => get(countAtom))
const incrementAtom = atom(null, (get, set) => {
  const count = get(countAtom)
  set(countAtom, count + 1)
})
const decrementAtom = atom(null, (get, set) => {
  const count = get(countAtom)
  set(countAtom, count - 1)
})
const readAndWriteCountAtom = atom(
  get => get(countAtom) * 2,
  (_get, set, newCount: number) => {
    set(countAtom, newCount * 7)
  },
)

function RouteComponent() {
  return (
    <div className='flex flex-col gap-2'>
      <DisplayCount />
      <SingleAtomCounter />
      <SeparateAtomsCounter />
    </div>
  )
}

function DisplayCount() {
  const count = useAtomValue(countAtom)
  /**
   * This also works;
   * const count = useAtomValue(countAtom)
   */

  return <p>count: {count}</p>
}

function SingleAtomCounter() {
  const [count, setCount] = useAtom(countAtom)
  return (
    <div className='flex gap-2'>
      <p>single atom counter</p>
      <Button onClick={() => setCount(count + 1)}>increment</Button>
    </div>
  )
}

function SeparateAtomsCounter() {
  const [, increment] = useAtom(incrementAtom)
  const [, decrement] = useAtom(decrementAtom)

  return (
    <div className='flex gap-2'>
      <p>separate atoms counter</p>
      <Button onClick={increment}>increment</Button>
      <Button onClick={decrement}>decrement</Button>
    </div>
  )
}
