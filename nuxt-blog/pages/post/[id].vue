<!-- Spies u25033931 -->
<template>
  <div class="post-page">
    <NuxtLink to="/" class="back-link">← Back to all posts</NuxtLink>

    <div v-if="pending" class="state-msg">Loading post…</div>
    <div v-else-if="error || !post" class="error-msg">Post not found.</div>

    <template v-else>
      <header class="post-header">
        <div v-if="post.category" class="post-header__category">{{ post.category }}</div>
        <h1 class="post-header__title">{{ post.title }}</h1>
        <div class="post-header__meta">
          <span class="author">{{ post.author || 'Unknown' }}</span>
          <span>·</span>
          <span>{{ formattedDate }}</span>
        </div>
      </header>

      <article class="post-content" v-html="renderedContent" />
    </template>
  </div>
</template>

<script setup>
// Spies u25033931
import { marked } from 'marked'

const route = useRoute()
const { fetchPost } = useStrapi()

const { data: postData, pending, error } = await useAsyncData(
  `post-${route.params.id}`,
  () => fetchPost(route.params.id)
)

const post = computed(() => postData.value)

const formattedDate = computed(() => {
  const d = post.value?.publishedAt || post.value?.createdAt
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })
})

const renderedContent = computed(() => {
  const raw = post.value?.content || ''
  return marked.parse(raw)
})

useHead(() => ({ title: post.value?.title ? `${post.value.title} — The Inkwell` : 'The Inkwell' }))
</script>
