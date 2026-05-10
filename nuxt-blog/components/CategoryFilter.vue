<!-- Spies u25033931 -->
<template>
  <div class="filter-bar">
    <label for="cat-filter">Filter by category:</label>
    <select id="cat-filter" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
      <option value="">All categories</option>
      <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
    </select>
  </div>
</template>

<script setup>
// Spies u25033931
defineProps({
  categories: { type: Array, default: () => [] },
  modelValue: { type: String, default: '' }
})
defineEmits(['update:modelValue'])
</script>
