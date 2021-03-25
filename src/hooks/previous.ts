// Hooks
import { useEffect, useRef } from 'react';

/**
 * One question that comes up a lot is "When using hooks how do I get the previous value of props or state?".
 * With React class components you have the componentDidUpdate method which receives previous props and state as arguments
 * or you can update an instance variable (this.previous = value) and reference it later to get the previous value.
 * So how can we do this inside a functional component that doesn't have lifecycle methods or an instance to store values on?
 * Hooks to the rescue! We can create a custom hook that uses the useRef hook internally for storing the previous value.
 * See the recipe below with inline comments. You can also find this example in the official React Hooks FAQ.
 *
 * @see https://usehooks.com/usePrevious/
 *
 * @param {any} value
 */
export function usePrevious<T = any>(value: T): T {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<T>();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current!;
}
