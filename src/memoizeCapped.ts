import { memoize } from './memoize';
import { MemoizeInterface } from './types';

/** Used as the maximum memoize cache size. */
export const MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
export function memoizeCapped(func: Function): MemoizeInterface {
  const result = memoize(func, (key: any) => {
    const { cache } = result;
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  return result;
}
