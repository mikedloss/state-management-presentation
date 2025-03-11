export const userQueryOptions = {
  queryKey: ['users'],
  queryFn: async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    return await response.json()
  },
  staleTime: 1000 * 60 * 5, // 5 minutes
  refetchOnWindowFocus: false,
}
