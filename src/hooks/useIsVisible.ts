import { useEffect, useState } from "react";


export default function useIsVisible(id: string, onShow?: () => void, onHide?: () => void, threshold=1) {
    const [lastCalled, setLastCalled] = useState(0)

    useEffect(() => {
        if (id) {     
            let options = {
                threshold,
            };
        
            let observer = new IntersectionObserver(entry => {
                if (entry[0].isIntersecting) {
                    if (onShow && Date.now() - lastCalled > 100) {
                       onShow() 
                       setLastCalled(Date.now())
                    }
                } else if (onHide){
                    onHide()
                }
            }, options);
            
            const el = (document.getElementById(id))
            if (el) {
                observer.observe(document.getElementById(id) as Element)
            }

            return () => {
                observer.disconnect()
            }
        }
    }, [id, onShow, onHide, threshold])
}