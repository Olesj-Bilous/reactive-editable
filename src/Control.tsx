import { ReactNode, memo } from 'react'
import { useEditableControl, useEditableEffects } from './Context'

export type ControlKey = 'add' | 'update'

export const Save = memo(
  ({ children, className }: { children?: ReactNode, className?: string }) => {
    const { isTouched, isValid } = useEditableControl()
    const { save } = useEditableEffects()

    return <button className={className ?? 'save'} disabled={!isTouched || !isValid} onClick={save}>
      {children}
    </button>
  }
)

export const ToggleEdit = memo(
  ({ children, className }: { children?: ReactNode, className?: string }) => {
    const { toggleEdit } = useEditableEffects()

    return (
      <button className={className ?? 'toggle-edit'} onClick={toggleEdit}>
        {children}
      </button>
    )
  }
)

export const Revert = memo(
  ({ children, className }: { children?: ReactNode, className?: string }) => {
    const { isTouched } = useEditableControl()
    const { revert } = useEditableEffects()

    return <button className={className ?? 'revert'} disabled={isTouched} onClick={revert}>
      {children}
    </button>
  }
)

export const Remove = memo(
  ({ children, className }: { children?: ReactNode, className?: string }) => {
    const { isTouched } = useEditableControl()
    const { remove } = useEditableEffects()

    return <>{remove && <button className={className ?? 'remove'} disabled={isTouched} onClick={remove}>
      {children}
    </button>}</>
  }
)

export const EditControl = memo(
  ({ create, hide, remove }: { create?: boolean, hide?: () => void, remove?: () => void }) => {
    const { editToggled, toggleEdit, isTouched, save, revert } = useEditableControl()

    const saveAction = create ? () => { save(); revert(); hide && hide() } : save

    return (
      <div className="control">
        {create && <button onClick={() => toggleEdit(!editToggled)}>
          {editToggled ? <>preview</> : <>edit</>}
        </button>}
        {
          editToggled && <>
            {
              !create && <button onClick={() => toggleEdit(false)}>
                cancel
              </button>
            }
            <button disabled={!create && !isTouched} onClick={saveAction}>
              save
            </button>
            <button disabled={!isTouched} onClick={revert}>
              undo
            </button>
            {!create && remove && <button onClick={remove}>
              edit
            </button>}
          </>
        }
        {
          create && hide && <button onClick={hide}>cancel</button>
        }
      </div>
    )
  }
)
