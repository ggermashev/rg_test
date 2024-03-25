import { FC, useCallback, useMemo, useState } from "react";
import styles from "./Pagination.module.css"
import useIsVisible from "../../hooks/useIsVisible";
import Button from "../../ui/Button/Button";


interface IPagination {
    name: string
    children: React.ReactNode;
    onLoad?: () => void
}

const Pagination: FC<IPagination> = ({children, name, onLoad}) => {
    const borderId = useMemo(() => {
        return `pagination-${name}-border`
    }, [name])

    const [timesCalled, setTimesCalled] = useState(0)
    const onShow = useMemo(() => {
        if (!onLoad) {
            return undefined
        }

        return () => {
            onLoad()
            setTimesCalled(timesCalled+1)
        }
    }, [timesCalled, onLoad])

    useIsVisible(
        borderId,
        onShow
    )

    return (
        <>
            {children}
            {timesCalled >= 5 
                ? <Button onClick={() => {onLoad?.()}}>Загрузить еще</Button>
                : <div className={styles.border} id={borderId}/>
            }
        </>
    )
}

export default Pagination