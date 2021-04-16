/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable func-call-spacing */

export function debounce (func: any, wait: any, options?: any) {
  let lastArgs: any;
  let lastThis: any;
  let maxWait: any;
  let result: any;
  let timerId: any;
  let lastCallTime: any;

  let lastInvokeTime = 0;
  let leading = false;
  let maxing = false;
  let trailing = true;

  const useRAF = (!wait && wait !== 0 && typeof globalThis.requestAnimationFrame === 'function');

  wait = +wait || 0;
  if (typeof options === 'object' || typeof options === 'function') {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc (time: any) {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function startTimer (pendingFunc: any, wait: any) {
    if (useRAF) {
      globalThis.cancelAnimationFrame(timerId);
      return globalThis.requestAnimationFrame(pendingFunc);
    }
    return setTimeout(pendingFunc, wait);
  }

  function cancelTimer (id: any) {
    if (useRAF) {
      return globalThis.cancelAnimationFrame(id);
    }
    clearTimeout(id);
  }

  function remainingWait (time: number) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke (time: number) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;

    return (lastCallTime === undefined || (timeSinceLastCall >= wait)
      || (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function trailingEdge (time: number) {
    timerId = undefined;

    if (trailing && lastArgs) {
      return invokeFunc(time);
    }

    lastArgs = lastThis = undefined;
    return result;
  }

  function leadingEdge (time: number) {
    lastInvokeTime = time;
    timerId = startTimer(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }

  function timerExpired () {
    const time = Date.now();

    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }

    timerId = startTimer(timerExpired, remainingWait(time));
  }

  function cancel () {
    if (timerId !== undefined) {
      cancelTimer(timerId);
    }

    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush () {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }

  function pending () {
    return timerId !== undefined;
  }

  function debounced (...args: any) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    lastThis = globalThis;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        timerId = startTimer(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.pending = pending;
  return debounced;
}

export function throttle (func: any, wait: any) {
  return debounce(func, wait, {
    leading: true,
    trailing: true,
    'maxWait': wait
  });
}
