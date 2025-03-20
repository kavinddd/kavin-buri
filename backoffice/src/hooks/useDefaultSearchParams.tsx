import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

type UseDefaultSearchParamsType<T> = {
  defaultSearch: T;
  // setSearch: React.Dispatch<React.SetStateAction<T>>;
};

function useDefaultSearchParams<T extends Record<string, unknown>>(
  initial: T,
): UseDefaultSearchParamsType<T> {
  const [params] = useSearchParams();

  const [defaultSearch, setDefaultSearch] = useState<T>({} as T);

  useEffect(() => {
    const newDefaultSearch: T = {} as T;

    params.forEach((value, key) => {
      if (key in initial) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (newDefaultSearch as any)[key] = value;
      }
    });

    setDefaultSearch(newDefaultSearch);
  }, [initial, params]);

  return { defaultSearch };
}

export default useDefaultSearchParams;
