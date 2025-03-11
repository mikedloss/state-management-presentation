import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

const data = [
  {
    id: 1,
    name: 'Mike',
    email: 'mike.dloss@rula.com',
  },
  {
    id: 2,
    name: 'John',
    email: 'john@smith.com',
  },
]

/**
 * 1. Lift state up to the parent component
 * 2. Use a key on `Details` to force a re-render when selected changes
 */

const RouteComponent = () => {
  const [selected, setSelected] = useState(data[0])

  return (
    <div>
      {data.map(person => (
        <Button
          type='button'
          key={person.id}
          onClick={() => setSelected(person)}
        >
          {person.id === selected.id ? person.name.toUpperCase() : person.name}
        </Button>
      ))}
      <Details initialEmail={selected.email} key={selected.id} />
    </div>
  )
}

const Details = ({ initialEmail }: { initialEmail: string }) => {
  const [email, setEmail] = useState(initialEmail)

  return (
    <div>
      <input
        type='text'
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
      <Button type='button' onClick={() => alert(email)}>
        Apply
      </Button>
    </div>
  )
}

export const Route = createFileRoute('/usestate/props-as-state')({
  component: RouteComponent,
})
