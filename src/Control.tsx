import { ReactNode } from 'react'
import { useEditControl, useEditEffects } from './Context'

export function ToggleEdit({ children, className }: { children?: ReactNode, className?: string }) {
  const { toggleEdit } = useEditEffects()

  return (
    <button className={className ?? 'toggle-edit'} onClick={toggleEdit}>
      {children}
    </button>
  )
}


export function Revert({ children, className }: { children?: ReactNode, className?: string }) {
  const { isTouched } = useEditControl()
  const { revert } = useEditEffects()

  return <button type="reset" className={className ?? 'revert'} disabled={isTouched} onClick={revert}>
    {children}
  </button>
}


export function Save({ children, className }: { children?: ReactNode, className?: string }) {
  const { isTouched, isValid } = useEditControl()
  const { save } = useEditEffects()

  return <button type="submit" className={className ?? 'save'} disabled={!isTouched || !isValid} onClick={save}>
    {children}
  </button>
}


export function Remove({ children, className }: { children?: ReactNode, className?: string }) {
  const { mode } = useEditControl()
  const { remove } = useEditEffects()

  return <>{mode !== 'create' && remove && <button className={className ?? 'remove'} onClick={remove}>
    {children}
  </button>}</>
}
