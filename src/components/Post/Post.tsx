import { FC } from "react"
import { IPost } from "../../utils/types"
import styles from "./Post.module.css"
import { useNavigate } from "react-router-dom"
import { POST_URL } from "../../utils/constants"

const Post: FC<IPost> = ({userId, id, title, body}) => {
    const navigate = useNavigate()

    return (
        <div className={styles.post} onClick={() => {navigate(`${POST_URL}/${id}`)}}>
            <div className={styles.header}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.author}>Id пользователя: {userId}</p>
            </div>
            <p>{body}</p>
        </div>
    )
}

export default Post