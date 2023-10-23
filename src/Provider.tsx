import { ReactNode, useReducer } from "react"
import { Dynamic, EditableControl, EditableEffects, Static, Toggle, useEditPermissionContext } from "./Context"

export interface EditConfig extends Omit<EditableControl, 'mode' | 'editToggled'>, Omit<EditableEffects, 'toggleEdit'> {
  mode?: EditableControl['mode']
  editToggled?: EditableControl['editToggled']
}

export function Editable(
  {
    children,
    mode = 'edit',
    editToggled: initEditToggled = false,
    remove,
    ...dynamic
  }: {
    children?: ReactNode
  } & EditConfig
) {
  const allowEdit = useEditPermissionContext()

  const [editToggled, toggleEdit] = useReducer(
    (editToggled: boolean) => !editToggled,
    initEditToggled
  )

  return <Static.Provider value={{
    mode,
    remove,
    toggleEdit
  }}>
    <Toggle.Provider value={{
      editToggled: allowEdit && editToggled
    }}>
      <Dynamic.Provider value={dynamic}>
        {children}
      </Dynamic.Provider>
    </Toggle.Provider>
  </Static.Provider>
}
