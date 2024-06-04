import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";

import {useLocalStorage} from "@/hooks/useLocalStorage";

export const useTabWithRouter = (defaultTab: string, route: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const [savedPath, setSavedPath] = useState("");
  const [selected, setSelected] = useState(defaultTab);

  const [storedValue, setStoredValue] = useLocalStorage("tabs", savedPath ?? defaultTab);

  useEffect(() => {
    setSelected(storedValue);
    setSavedPath(pathname);
    if (pathname !== route) {
      setStoredValue(defaultTab);
    }
  }, [pathname, storedValue]);

  const onTabChange = (key: any) => {
    const newKey = key as string;

    setSelected(newKey);
    setStoredValue(newKey);
    router.push(savedPath + "?request=" + newKey);
  };

  return {selected, onTabChange};
};
