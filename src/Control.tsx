import { ReactNode, memo } from 'react'
import { useEditControl, useEditEffects } from './Context'

export const ToggleEdit = memo(
  ({ children, className }: { children?: ReactNode, className?: string }) => {
    const { toggleEdit } = useEditEffects()

    return (
      <button className={className ?? 'toggle-edit'} onClick={toggleEdit}>
        {children}
      </button>
    )
  }
)

export const Revert = memo(
  ({ children, className }: { children?: ReactNode, className?: string }) => {
    const { isTouched } = useEditControl()
    const { revert } = useEditEffects()

    return <button className={className ?? 'revert'} disabled={isTouched} onClick={revert}>
      {children}
    </button>
  }
)

export const Save = memo(
  ({ children, className }: { children?: ReactNode, className?: string }) => {
    const { isTouched, isValid } = useEditControl()
    const { save } = useEditEffects()

    return <button className={className ?? 'save'} disabled={!isTouched || !isValid} onClick={save}>
      {children}
    </button>
  }
)

export const Remove = memo(
  ({ children, className }: { children?: ReactNode, className?: string }) => {
    const { mode } = useEditControl()
    const { remove } = useEditEffects()

    return <>{mode !== 'create' && remove && <button className={className ?? 'remove'} onClick={remove}>
      {children}
    </button>}</>
  }
)

