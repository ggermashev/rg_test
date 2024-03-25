import { Children, FC } from "react"
import styles from "./Button.module.css"


interface IButton {
    children: React.ReactNode
    onClick: () => void
}

const Button: FC<IButton> = ({children, onClick}) => {
    return (
        <button className={styles.btn} onClick={onClick}>{children}</button>
    )
}

export default Button