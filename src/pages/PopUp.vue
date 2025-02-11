<script setup>
import { ref } from 'vue'

const counter = ref(0)

chrome.storage.local.get('counter').then((data) => {
  counter.value = data.counter || 5
})

const increment = () => {
  counter.value++

  chrome.storage.local.set({ counter: counter.value })
}
</script>

<template>
  <main>
    <h1>Popup {{ counter }}</h1>
    <button @click="increment">Increment</button>
  </main>
</template>

<style scoped></style>
