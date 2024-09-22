"use client";

import {useState, useEffect, useDebugValue} from "react";

const parse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const useLocalStorage = <S>(
  key: string,
  initialState?: S | (() => S),
): [S, React.Dispatch<React.SetStateAction<S>>, () => void] => {
  const [state, setState] = useState<S>(() => {
    const value = typeof initialState === "function" ? (initialState as () => S)() : initialState;
    return value !== undefined ? value : ({} as S);
  });

  useEffect(() => {
    try {
      if (typeof localStorage !== "undefined") {
        const item = localStorage.getItem(key);
        setState(item ? parse(item) : (initialState as S));
      } else {
        console.error("localStorage is not available.");
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, [key, initialState]);

  useDebugValue(state);

  useEffect(() => {
    try {
      if (typeof localStorage !== "undefined") {
        if (
          state !== null &&
          state !== "" &&
          !(Array.isArray(state) && state.length === 0) &&
          !(typeof state === "object" && Object.keys(state).length === 0)
        ) {
          localStorage.setItem(key, JSON.stringify(state));
        }
      } else {
        console.error("localStorage is not available.");
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, [key, state]);

  const removeItem = () => {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem(key);
        setState(initialState!);
      } else {
        console.error("localStorage is not available.");
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  };

  return [state, setState, removeItem];
};

export default useLocalStorage;

/*
use case 1: const [value, setValue] = useLocalStorage("data", []);
* when you set your item from local storage, then just call the setValue() function.
example: setValue(data as any);

use case 2: const [value] = useLocalStorage("data");
* when you get your local storage item then just call the value variable.
example: value (console.log(value) or use it as you want)

use case 3: const [removeItem] = useLocalStorage("data");
* when you remove your local storage item then just call the removeItem() function.
example: removeItem();
*/
