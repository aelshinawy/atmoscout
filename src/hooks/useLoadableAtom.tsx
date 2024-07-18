import { Loadable } from "jotai/vanilla/utils/loadable";

function useLoadableAtom<Value>(result: Awaited<Loadable<Promise<Value>>>) {
  const isLoading = result.state === "loading";
  const hasData = result.state === "hasData";
  const hasError = result.state === "hasError";

  return {
    isLoading,
    hasData,
    hasError,
    data: hasData ? result.data : undefined,
    error: hasError ? result.error : undefined,
  };
}

export default useLoadableAtom;
