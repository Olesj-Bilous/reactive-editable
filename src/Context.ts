import { defineContext } from "define-context";

export const [EditPermissionContext, useEditPermissionContext] = defineContext<boolean>('EditPermission', 'allowEdit')

export interface EditableControl {
  mode: 'edit' | 'create'
  editToggled: boolean
  isTouched: boolean
  isValid: boolean
}

export interface EditableEffects {
  toggleEdit: () => void
  revert: () => void
  save: () => void
  remove?: () => void
}

export interface StaticContext {
  mode: EditableControl['mode']
  toggleEdit: EditableEffects['toggleEdit']
  remove?: EditableEffects['remove']
}

export interface ToggleContext {
  editToggled: EditableControl['editToggled']
}

export interface DynamicContext {
  isTouched: EditableControl['isTouched']
  isValid: EditableControl['isValid']
  revert: EditableEffects['revert']
  save: EditableEffects['save']
}

const [Static, useStatic] = defineContext<StaticContext>('Editable', 'static')
const [Toggle, useToggle] = defineContext<ToggleContext>('Editable', 'toggle')
const [Dynamic, useDynamic] = defineContext<DynamicContext>('Editable', 'dynamic')

export { Static, Toggle, Dynamic }

export function useEditControl(): EditableControl {
  const { mode } = useStatic()
  const { editToggled } = useToggle()
  const { isTouched, isValid } = useDynamic()
  return {
    mode,
    editToggled,
    isTouched,
    isValid
  }
}

export function useEditEffects(): EditableEffects {
  const { toggleEdit, remove } = useStatic()
  const { revert, save } = useDynamic()
  return {
    toggleEdit,
    remove,
    revert,
    save
  }
}
