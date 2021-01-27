import { MutableRefObject, useEffect, useRef } from "react";

export default function useCombinedRefs<T>(
  ...refs: (((instance: T) => void) | MutableRefObject<T>)[]
) {
  const targetRef = useRef<T>();

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === "function") ref(targetRef.current);
      else ref.current = targetRef.current;
    });
  }, [refs]);

  return targetRef;
}
