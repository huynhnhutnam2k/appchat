import React from 'react'
import './input.scss'
interface IProps {
    name?: string
    type?: string
    placeHolder?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}
const Input: React.FC<IProps> = ({ type = "text", ...props }) => {
    const { name, placeHolder, onChange } = props
    return (
        <input type={type} onChange={onChange} placeholder={placeHolder} name={name} className="input" />
    )
}

export default Input