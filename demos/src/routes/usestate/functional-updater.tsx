import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

function RouteComponent() {
  const [brokenCount, setBrokenCount] = useState(0)
  const [workingCount, setWorkingCount] = useState(0)

  return (
    <div className='flex flex-col items-start'>
      <Button
        onClick={() => {
          setBrokenCount(brokenCount + 1)
          setBrokenCount(brokenCount + 1)
        }}
      >
        ❌ This will not work as expected, count is: {brokenCount}
      </Button>
      <Button
        onClick={() => {
          setWorkingCount(previousCount => previousCount + 1)
          setWorkingCount(previousCount => previousCount + 1)
        }}
      >
        ✅ Increment by 2, count is: {workingCount}
      </Button>
    </div>
  )
}

export const Route = createFileRoute('/usestate/functional-updater')({
  component: RouteComponent,
})
