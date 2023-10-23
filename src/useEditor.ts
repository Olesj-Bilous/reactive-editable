import { useState, useCallback, useMemo } from "react"

export type Settable<T> = [
  value: T,
  set: (value: T) => void
]

export function useEditor<T>([global, setGlobal]: Settable<T>) {
  const [local, setLocal] = useState(global)

  const property = useCallback(
    <K extends keyof T>(key: K): Settable<T[K]> => [
      local[key],
      (value: T[K]) => setLocal(
        state => ({
          ...state,
          [key]: value
        })
      )
    ],
    [local]
  )

  const revert = useCallback(
    () => setLocal(global),
    [global]
  )

  const save = useCallback(
    () => setGlobal(local),
    [local] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const isTouched = useMemo(
    () => !Object.is(local, global),
    [local, global]
  )

  return {
    isTouched,
    property,
    revert,
    save
  }
}
