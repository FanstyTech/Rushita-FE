import React, { ReactNode } from 'react'

function ContainerInput({ isEditing, children }: { isEditing: boolean, children: ReactNode }) {
    return (
        <div className={`${isEditing ? "border-white border" : " border-0"} flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm  text-white`}>{children}</div>
    )
}

export default ContainerInput