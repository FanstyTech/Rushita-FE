import { LucideIcon } from 'lucide-react'
import React from 'react'

function CardDiv({ Icon, title, doctorname, rotate, className, bgcolor }: { bgcolor: string, className?: string, rotate: number, Icon: LucideIcon, title: string, doctorname: string }) {
    return (
        <div style={{ rotate: `${rotate}deg` }} className={`w-full  h-full absolute -top-10 -right-10  rounded-full pointer-events-none ${className}`}>
            <div style={{ rotate: `${rotate * -1}deg` }} className="max-w-[210px] px-3 py-3 xl:scale-100  scale-70 bg-white shadow-md rounded-lg">
                <div className="flex ">
                    <div className="flex gap-3">
                        <div className={`w-6 h-6 p-2 flex justify-center items-center rounded-full ${bgcolor}`} >
                            <Icon className="text-white scale-110" size={10} />
                        </div>
                        <p className="" style={{ fontSize: "10px" }}>{title}</p>
                    </div>
                </div>
                <p className="text-black/70 text-left" style={{ fontSize: "10px" }}  >{doctorname}</p>
            </div>
        </div>)
}

export default CardDiv