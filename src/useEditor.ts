import { useState, useCallback, useMemo } from "react"

export type Settable<T> = [
  value: T,
  set: (value: T) => void
]

export function useEditor<T>() {
  const [local, setLocal] = useState(global)

  const isTouched = useMemo(
    () => !Object.is(local, global),
    [local, global]
  )

  const revert = useCallback(
    () => setLocal(global),
    [global]
  )

  const save = useCallback(
    () => setGlobal(local),
    [setGlobal, local]
  )

  return {
    local,
    isTouched,
    revert,
    save
  }
}
