import { useEffect, useState } from "react";


export default function useIsVisible(id: string, onShow?: () => void, onHide?: () => void, threshold=1) {
    const [lastCalled, setLastCalled] = useState(0)

    useEffect(() => {
        if (!id) { return }

        const options = {threshold}

        const observer = new IntersectionObserver(entry => {
            if (entry[0].isIntersecting) {
                if (!onShow) { return }

                if (Date.now() - lastCalled > 100) {
                    onShow() 
                    setLastCalled(Date.now())
                }
            } else {
                onHide?.()
            }
        }, options);
        
        const element = document.getElementById(id)
        if (!element) { return }

        observer.observe(element)
        
        return () => {
            observer.disconnect()
        }
        
    }, [id, onShow, onHide, threshold])
}