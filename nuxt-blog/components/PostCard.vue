<!-- Spies u25033931 -->
<template>
  <NuxtLink :to="`/post/${post.documentId || post.id}`" class="card">
    <div class="card__body">
      <div v-if="post.category" class="card__category">{{ post.category }}</div>
      <h2 class="card__title">{{ post.title }}</h2>
      <p class="card__snippet">{{ post.snippet || shortContent }}</p>
      <div class="card__meta">
        <span class="author">{{ post.author || 'Unknown' }}</span>
        <span class="dot">·</span>
        <span>{{ formattedDate }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
// Spies u25033931
const props = defineProps({
  post: { type: Object, required: true }
})

const shortContent = computed(() => {
  const raw = props.post.content || ''
  return raw.length > 160 ? raw.slice(0, 160) + '…' : raw
})

const formattedDate = computed(() => {
  const d = props.post.publishedAt || props.post.createdAt
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' })
})
</script>
