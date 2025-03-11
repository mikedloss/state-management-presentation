import { createFileRoute } from '@tanstack/react-router'
import { useMachine } from '@xstate/react'
import { setup } from 'xstate'

export const Route = createFileRoute('/thirdparty/xstate')({
  component: RouteComponent,
})

/**
 * https://stately.ai/registry/editor/f7a01885-9b8f-4c40-b961-0eb0e17b3f8f?mode=Simulate&machineId=503e36e8-1118-4898-9036-123178f35592
 */

const machine = setup({
  types: {
    context: {} as object,
    events: {} as { type: 'next' } | { type: 'back' },
  },
  actions: {
    reset: () => {
      console.log('reset action')
    },
  },
  guards: {
    'some condition': ({ context, event }) => {
      // Add your guard condition here
      console.log('some condition guard', context, event)
      return true
    },
  },
}).createMachine({
  context: {},
  id: 'Untitled',
  initial: 'Initial state',
  states: {
    'Initial state': {
      on: {
        next: {
          target: 'Another state',
        },
      },
    },
    'Another state': {
      on: {
        next: [
          {
            target: 'Parent state',
            guard: {
              type: 'some condition',
            },
          },
          {
            target: 'Initial state',
          },
        ],
      },
    },
    'Parent state': {
      initial: 'Child state',
      on: {
        back: {
          target: 'Initial state',
          actions: { type: 'reset' },
        },
      },
      states: {
        'Child state': {
          on: {
            next: {
              target: 'Another child state',
            },
          },
        },
        'Another child state': {
          on: {
            back: {
              target: 'Child state',
            },
          },
        },
      },
    },
  },
})

function RouteComponent() {
  const [state, send] = useMachine(machine)

  console.log(state)

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>XState Demo</h1>

      <div className='mb-4 p-3 bg-gray-100 rounded'>
        <p className='font-semibold'>
          Current State:{' '}
          {state.matches('Parent state') &&
          typeof state.value === 'object' &&
          'Parent state' in state.value
            ? `Parent state -> ${state.value['Parent state']}`
            : state.value.toString()}
        </p>
      </div>

      <div className='flex gap-2'>
        <button
          onClick={() => send({ type: 'next' })}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          Next
        </button>

        {!state.matches('Initial state') && (
          <button
            onClick={() => send({ type: 'back' })}
            className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
          >
            Back
          </button>
        )}
      </div>
    </div>
  )
}
