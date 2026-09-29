function abortError() {
  return new DOMException("The operation was aborted.", "AbortError");
}

/** Promise-based sleep that rejects with an AbortError when `signal` aborts. */
export function delay(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(abortError());
      return;
    }

    const onAbort = () => {
      clearTimeout(timer);
      reject(abortError());
    };

    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);

    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

export function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}

export function randomBetween(min: number, max: number) {
  return Math.round(min + Math.random() * (max - min));
}
