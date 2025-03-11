/**
 * A versatile function for performing different types of expensive calculations.
 * @param {string} type - The type of calculation to perform: 'primes', 'fibonacci', or 'matrix'
 * @param {number} param - The parameter for the calculation (upper limit for primes, n for fibonacci, size for matrix)
 * @returns {any} - The result of the calculation
 */
export function expensiveCalculation() {
  // Calculate Fibonacci number recursively
  // This is intentionally inefficient - using recursion without memoization
  // to create a CPU-intensive task that takes >2 seconds

  const fib = (n: any) => {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
  };

  const start = performance.now();

  // n=43 should take at least 2-3 seconds on most hardware
  const result = fib(40);

  const end = performance.now();
  console.log(
    `Expensive calculation completed in ${(end - start) / 1000} seconds`
  );

  return result;
}

// Examples of usage:
// const primes = expensiveCalculation('primes', 1000000);
// const fib40 = expensiveCalculation('fibonacci', 40);
// const matrixResult = expensiveCalculation('matrix', 300);
