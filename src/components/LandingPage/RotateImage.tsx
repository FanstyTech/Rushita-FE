import React from 'react'

export default function RotateImage({ rotate, image }: { rotate: number, image: string }) {
    return (
        <div style={{ rotate: `${rotate * -1}deg` }} className={`w-full   h-full absolute top-0 left-0 rounded-full pointer-events-none`}>
            <div className={`absolute top-9  border border-foreground md:left-5 left-0 h-10 w-10 rounded-full bg-center` } style={{ backgroundImage: `url('${image}')`, rotate: `${rotate}deg` }}></div>
        </div>
    )
}
