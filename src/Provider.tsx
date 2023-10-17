import { defineContext, SingleArgMap, defineModelHub, Dispatcher } from "define-context"
import { Settable } from "./useEditor"
import { useCallback, useMemo, ReactNode, useReducer } from "react"
import { EditableControl, EditableEffects } from "./Context"

export function createEditable<T, X extends keyof T | '' = ''>(
  descriptor: string
) {
  const { useReducerHub: useLocalHub, defineProvider } = defineModelHub({
    replace(_currentModel: Readonly<T>, newModel: T) {
      return newModel
    }
  })<X>()
  const { StateContext: LocalContext, useReducerState: useLocalModel } = defineProvider(descriptor)
  const [PropertyDispatcherContext, usePropertyDispatcher] = defineContext<Dispatcher<SingleArgMap<Omit<T, X>>>>(
    `${descriptor}Property`,
    'dispatcher'
  )

  function usePropertyValue<K extends Exclude<keyof T, X> & string>(): (prop: K)=> [value: T[K], set: (value: T[K]) => void] {
    const value = useLocalModel()
    const set = usePropertyDispatcher()
    return (prop) => [value[prop], set(prop)]
  }

  return {
    Editable({ mode = 'edit', settable: [global, setGlobal], remove, children }: {
      mode?: 'edit' | 'create'
      settable: Settable<T>
      remove?: () => void
      children?: ReactNode
    }) {
      const [local, dispatcher] = useLocalHub(global)

      const isTouched = useMemo(
        () => !Object.is(local, global),
        [local, global]
      )

      const [replace, setProperty] = useMemo(
        () => [dispatcher('action')('replace'), dispatcher('model')],
        [] // eslint-disable-line react-hooks/exhaustive-deps
      )

      const revert = useCallback(
        () => replace(global),
        [global] // eslint-disable-line react-hooks/exhaustive-deps
      )

      const save = useCallback(
        () => setGlobal(local),
        [local] // eslint-disable-line react-hooks/exhaustive-deps
      )

      const [editToggled, toggleEdit] = useReducer((editToggled: boolean) => !editToggled, false)

      return <EditableControl.Provider value={{
        mode,
        editToggled,
        isTouched,
        isValid: true
      }}>
        <EditableEffects.Provider value={{
          toggleEdit,
          revert,
          save,
          remove
        }}>
          <LocalContext.Provider value={local}>
            <PropertyDispatcherContext.Provider value={setProperty}>
              {children}
            </PropertyDispatcherContext.Provider>
          </LocalContext.Provider>
        </EditableEffects.Provider>
      </EditableControl.Provider>
    },
    usePropertyValue,
    useLocalModel,
    usePropertyDispatcher
  }
}
