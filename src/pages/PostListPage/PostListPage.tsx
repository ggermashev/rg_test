import { useCallback, useEffect, useMemo, useState } from "react"
import styles from "./PostListPage.module.css"
import { IPost } from "../../utils/types"
import { getPosts } from "../../api/posts"
import { POSTS_BATCH_SIZE } from "../../utils/constants"
import Post from "../../components/Post/Post"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Pagination from "../../components/Pagination/Pagination"
import { parseSearchParams } from "../../utils/utils"

const PostListPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()

    //Хотелось бы использовать серверную пагинацию
    //Но не обнаружил соответствующего API на предлагаемом ресурсе
    const [allPosts, setAllPosts] = useState<IPost[]>([])
    const [visiblePosts, setVisiblePosts] = useState<IPost[]>([])

    useEffect(() => {
        //При первом переходе устанавливаем число постов
        if (!location.search) {
            navigate(`${location.pathname}?count=${POSTS_BATCH_SIZE}`)
            return;
        } 

        //При изменении числа постов подгружаем их
        (async () => {
            const {count} = parseSearchParams(location.search)
            const numberOfPosts = parseInt(count)
            const posts = await getPosts()
            setAllPosts(posts)
            setVisiblePosts(posts.slice(0, numberOfPosts))
        })()
    }, [location])

    const onLoad = useMemo(() => {
        //Переходим на страницу с новым числом постов
        if (allPosts.length) {
            return () => {
                const {count} = parseSearchParams(location.search)
                const numberOfPosts = parseInt(count)
        
                if (!numberOfPosts) {
                    return
                }
        
                const newCount = Math.min(allPosts.length, numberOfPosts + POSTS_BATCH_SIZE)
                navigate(`${location.pathname}?count=${newCount}`)
            }
        }

        return undefined
    }, [location, allPosts])

    return (
        <div className={styles.page}>
            <Pagination name="posts" onLoad={onLoad}>
                {visiblePosts?.map(({id, userId, title, body}: IPost) =>
                    <Post key={id} id={id} userId={userId} title={title} body={body}/>
                )}
            </Pagination>
            
        </div>
    )
}

export default PostListPage