<script setup>
import { reactive, ref } from 'vue'
import settings from '@/services/settings.js'
import SiteCard from './components/SiteCard.vue'

const isLoaded = ref(false)
const modifications = reactive({})

chrome.storage.sync.get('modifications').then((data) => {
    Object.assign(modifications, data.modifications || {})
    isLoaded.value = true
})

const changeSetting = (event, key) => {
    modifications[key] = event.target.checked

    chrome.storage.sync.set({ modifications })
}
</script>

<template>
  <main>
    <div class="card header">
      <h2>Purify</h2>
      <span>Bringing clarity to websites</span>
    </div>

    <div v-if="isLoaded" class="card">
      <SiteCard
        v-for="site in settings.sites"
        :key="site.key"
        :site="site"
        :modifications="modifications"
        @change="changeSetting"
      />
    </div>

    <div class="card footer">
      <a href="https://github.com/Loafer19/purify" target="_blank">GitHub</a>
    </div>
  </main>
</template>

<style scoped></style>

