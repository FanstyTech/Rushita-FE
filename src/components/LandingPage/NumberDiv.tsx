import React from 'react'

function NumberDiv({ number, text }: { number: string, text: string }) {
    return (
        <div className='flex flex-col gap-3 items-center text-center'>
            <h1 className='text-primary  font-extrabold text-4xl'>{number}</h1>
            <h4 className='text-foreground/70'>{text}</h4>
        </div>
    )
}

export default NumberDiv