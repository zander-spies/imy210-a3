<!-- Spies u25033931 -->
<template>
  <div class="container">
    <div class="search-page">
      <h1 class="search-page__heading">Search</h1>
      <p class="search-page__sub">Find posts by title or author name.</p>

      <div class="search-box">
        <input
          v-model="query"
          type="text"
          placeholder="Type a title or author…"
          @keyup.enter="runSearch"
        />
        <button @click="runSearch">Search</button>
      </div>

      <template v-if="searched">
        <p class="search-results-label">
          {{ results.length }} result{{ results.length !== 1 ? 's' : '' }} for "{{ lastQuery }}"
        </p>
        <div v-if="loading" class="state-msg">Searching…</div>
        <div v-else-if="results.length === 0" class="state-msg">No results found.</div>
        <div v-else class="posts-grid">
          <PostCard v-for="post in results" :key="post.id" :post="post" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
// Spies u25033931
const { searchPosts } = useStrapi()

const query = ref('')
const lastQuery = ref('')
const results = ref([])
const loading = ref(false)
const searched = ref(false)

const runSearch = async () => {
  if (!query.value.trim()) return
  lastQuery.value = query.value.trim()
  loading.value = true
  searched.value = true
  try {
    results.value = await searchPosts(lastQuery.value)
  } catch {
    results.value = []
  } finally {
    loading.value = false
  }
}

useHead({ title: 'Search — The Inkwell' })
</script>
