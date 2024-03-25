import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { POST_LIST_URL } from "../../utils/constants"


const MainPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate(POST_LIST_URL)
    }, [])

    return (
        <></>
    )
}

export default MainPage