import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { IPost } from "../../utils/types"
import { getSinglePost } from "../../api/posts"
import Button from "../../ui/Button/Button"
import styles from "./PostPage.module.css"


const PostPage = () => {
    const navigate = useNavigate()
    const {id} = useParams()

    const [postInfo, setPostInfo] = useState<IPost>()

    useEffect(() => {
        (async () => {
            const post = await getSinglePost(id)
            setPostInfo(post)
        })()
    }, [id])

    return (
        <div className={styles.page}>
            <h1>Это страница с подробным описанием поста с id {id} </h1>
            <h2>А это данные, полученные при запросе поста с id {id}</h2>
            <p>userId: {postInfo?.userId}</p>
            <p>title: {postInfo?.title}</p>
            <p>body: {postInfo?.body}</p>
            <Button onClick={() => {navigate(-1)}}>Назад</Button>
        </div>
    )
}

export default PostPage