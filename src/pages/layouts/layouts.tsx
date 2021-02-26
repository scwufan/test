import React, { FC } from 'react'

interface Props{
    children: React.ReactNode
}
const Layouts:  FC<Props> = (props: Props) => {

    return (
        
        <div>
            {props.children}
            adad
        </div>
    )
}

export default Layouts
