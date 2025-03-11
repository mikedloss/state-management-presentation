import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const Route = createFileRoute('/thirdparty/react-hook-form')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SimpleForm />
}

// Define a simple schema with just one field
const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

// Infer the type from the schema
type FormData = z.infer<typeof formSchema>

const SimpleForm = () => {
  // Initialize the form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  // Form submission handler
  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Form submitted:', data)
    alert(`Subscribed with email: ${data.email}`)
  }

  console.log('form', form)
  console.log('formState', form.formState)

  return (
    <div className='w-full max-w-md p-6'>
      <h1 className='text-2xl font-bold mb-6'>Subscribe to Newsletter</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='your-email@example.com' {...field} />
                </FormControl>
                <FormDescription>
                  We'll never share your email with anyone else.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            className='w-full'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
