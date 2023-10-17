import { memo, useState } from 'react'
import { EditableContext, useEditPermissionContext } from './Context'
import { EditControl } from './Control'

export const Editable = memo(
  ({ children, create, editToggled, toggleEdit, deleteM, ...ctrlProps }: EditableContext & {
    children?: React.ReactNode
    create?: boolean
    deleteM?: () => void
  }) => {
    const { allowEdit } = useEditPermissionContext()
    const [show, setShow] = useState(!create)

    return <EditableContext.Provider value={{
      editToggled: allowEdit && editToggled,
      toggleEdit,
      ...ctrlProps
    }}>
      <div
        onClick={!create && allowEdit && !editToggled ? (() => toggleEdit(true)) : undefined}
        className={`editable ${editToggled ? 'editing' : ''} ${create ? 'creating' : ''}`}
      >
      {
        show
          ? <>
            <div className="content">
              {children}
            </div>
            {allowEdit && <EditControl create={create} remove={deleteM} hide={() => setShow(false)} />}
          </>
          : allowEdit && <button onClick={() => setShow(true)}>
            +
          </button>
      }
      </div>
    </EditableContext.Provider>
  }
)
