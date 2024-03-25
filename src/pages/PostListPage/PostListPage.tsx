import { useEffect, useMemo, useState } from "react"
import styles from "./PostListPage.module.css"
import { IPost } from "../../utils/types"
import { getPosts } from "../../api/posts"
import { POSTS_BATCH_SIZE } from "../../utils/constants"
import Post from "../../components/Post/Post"
import { useLocation, useNavigate } from "react-router-dom"
import Pagination from "../../components/Pagination/Pagination"
import { parseSearchParams } from "../../utils/utils"

const PostListPage = () => {
    const navigate = useNavigate()
    const location = useLocation()

    //Хотелось бы использовать серверную пагинацию
    //Но не обнаружил соответствующего API на предлагаемом ресурсе
    const [allPosts, setAllPosts] = useState<IPost[]>([])
    const [visiblePosts, setVisiblePosts] = useState<IPost[]>([])
    const [portionsNumber, setPortionsNumber] = useState(0)

    useEffect(() => {
        if (!location.search) {
            navigate(`${location.pathname}?count=${1}`)
            return;
        } 

        (async () => {
            const {count} = parseSearchParams(location.search)
            const numberOfPosts = parseInt(count) * POSTS_BATCH_SIZE
            setPortionsNumber(parseInt(count))

            const posts = await getPosts()
            setAllPosts(posts)
            setVisiblePosts(posts.slice(0, numberOfPosts))
        })()
    }, [location])

    const onLoad = useMemo(() => {
        if (allPosts.length) {
            return () => {
                const {count} = parseSearchParams(location.search)
                const numberOfBatches = parseInt(count)
        
                if (!numberOfBatches) {
                    return
                }
        
                const newCount = Math.min(Math.ceil(allPosts.length / POSTS_BATCH_SIZE), numberOfBatches + 1)
                navigate(`${location.pathname}?count=${newCount}`)
            }
        }

        return undefined
    }, [location, allPosts])



    return (
        <div className={styles.page}>
            <Pagination name="posts" onLoad={onLoad} portionsNumber={portionsNumber} setPortionsNumber={setPortionsNumber}>
                {visiblePosts?.map(({id, userId, title, body}: IPost) =>
                    <Post key={id} id={id} userId={userId} title={title} body={body}/>
                )}
            </Pagination>
        </div>
    )
}

export default PostListPage