import { defineContext } from "define-context";

export const [EditPermissionContext, useEditPermissionContext] = defineContext<boolean>('EditPermission', 'allowEdit')

export interface EditableControl {
  mode?: 'edit' | 'create'
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

export const [EditableControl, useEditableControl] = defineContext<EditableControl>('EditableControl')
export const [EditableEffects, useEditableEffects] = defineContext<EditableEffects>('EditableEffects')
