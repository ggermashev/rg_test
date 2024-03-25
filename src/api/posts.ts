import { IPost } from "../utils/types"

export async function getPosts(): Promise<IPost[]> {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const json = await res.json()
    return json
}

export async function getSinglePost(id?: string): Promise<IPost | undefined> {
    if (!id) {
        return
    }

    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const json = await res.json()
    return json
}