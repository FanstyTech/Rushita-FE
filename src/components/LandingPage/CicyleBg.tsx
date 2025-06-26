import React from 'react'

function CicyleBg({ className }: { className?: string }) {
    return (
        <div className={` ${className || '-top-10 -right-15 to-secend '} z-50 w-60 h-60 bg-gradient-to-l pointer-events-none opacity-20 from-primary absolute  blur-3xl `}>

        </div>
    )
}

export default CicyleBg