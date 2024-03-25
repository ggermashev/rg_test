export function parseSearchParams(params: string) {
    const json: Record<string, string> = {}

    // params: ?name1=val1&name2=val2&name3=val3...
    params = params.slice(1)
    const pairs = params.split("&")
    pairs.forEach(pair => {
        const [key, value] = pair.split("=")
        json[key] = value
    })

    return json
}