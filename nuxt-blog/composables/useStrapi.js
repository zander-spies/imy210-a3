// Spies u25033931
export const useStrapi = () => {
  const config = useRuntimeConfig()
  const base = config.public.strapiBase

  const fetchPosts = async (params = {}) => {
    const qs = new URLSearchParams()
    qs.append('sort', 'publishedAt:desc')
    if (params.category) qs.append('filters[category][$eq]', params.category)
    const res = await fetch(`${base}/api/blog-posts?${qs}`)
    if (!res.ok) throw new Error('Failed to fetch posts')
    const json = await res.json()
    return json.data || []
  }

  const fetchPost = async (id) => {
    const res = await fetch(`${base}/api/blog-posts/${id}`)
    if (!res.ok) throw new Error('Failed to fetch post')
    const json = await res.json()
    return json.data || null
  }

  const fetchCategories = async () => {
    const res = await fetch(`${base}/api/blog-posts?sort=publishedAt:desc`)
    if (!res.ok) return []
    const json = await res.json()
    const posts = json.data || []
    const seen = new Set()
    return posts
      .map(p => p.category)
      .filter(c => c && !seen.has(c) && seen.add(c))
      .map((name, i) => ({ id: i, name }))
  }

  const searchPosts = async (query) => {
    const qs = new URLSearchParams()
    qs.append('filters[$or][0][title][$containsi]', query)
    qs.append('filters[$or][1][author][$containsi]', query)
    const res = await fetch(`${base}/api/blog-posts?${qs}`)
    if (!res.ok) throw new Error('Search failed')
    const json = await res.json()
    return json.data || []
  }

  return { fetchPosts, fetchPost, fetchCategories, searchPosts }
}
