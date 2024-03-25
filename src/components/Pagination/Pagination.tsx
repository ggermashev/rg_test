import { FC, useMemo } from "react";
import styles from "./Pagination.module.css"
import useIsVisible from "../../hooks/useIsVisible";
import Button from "../../ui/Button/Button";


interface IPagination {
    name: string
    children: React.ReactNode;
    onLoad?: () => void
    portionsNumber: number
    setPortionsNumber: (val: number) => void
}

const Pagination: FC<IPagination> = ({children, name, onLoad, portionsNumber, setPortionsNumber}) => {
    const borderId = useMemo(() => {
        return `pagination-${name}-border`
    }, [name])

    const onShow = useMemo(() => {
        if (!onLoad) {
            return undefined
        }

        return () => {
            onLoad()
            setPortionsNumber(portionsNumber+1)
        }
    }, [portionsNumber, onLoad])

    useIsVisible(
        borderId,
        onShow
    )

    return (
        <>
            {children}
            {portionsNumber >= 5 
                ? <Button onClick={() => {onLoad?.()}}>Загрузить еще</Button>
                : <div className={styles.border} id={borderId}/>
            }
        </>
    )
}

export default Pagination