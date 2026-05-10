<!-- Spies u25033931 -->
<template>
  <main>
    <section class="hero">
      <p class="hero__eyebrow">A curated reading experience</p>
      <h1 class="hero__title">The Inkwell</h1>
      <p class="hero__sub">Stories, ideas and perspectives worth your time.</p>
    </section>

    <div class="container">
      <CategoryFilter v-model="selectedCategory" :categories="categories" />

      <div v-if="pending" class="state-msg">Loading posts…</div>
      <div v-else-if="error" class="error-msg">Could not load posts. Is Strapi running?</div>
      <div v-else-if="filteredPosts.length === 0" class="state-msg">No posts found.</div>
      <div v-else class="posts-grid">
        <PostCard v-for="post in filteredPosts" :key="post.id" :post="post" />
      </div>
    </div>
  </main>
</template>

<script setup>
// Spies u25033931
const { fetchPosts, fetchCategories } = useStrapi()

const selectedCategory = ref('')

const { data: posts, pending, error } = await useAsyncData('posts', () => fetchPosts())
const { data: categories } = await useAsyncData('categories', () => fetchCategories())

const filteredPosts = computed(() => {
  if (!posts.value) return []
  if (!selectedCategory.value) return posts.value
  return posts.value.filter(p => p.category === selectedCategory.value)
})

useHead({ title: 'The Inkwell — Home' })
</script>
