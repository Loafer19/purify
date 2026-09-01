<script setup>
import { Moon, Sun } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { storageGet, storageSet } from '@/services/storage'

const theme = ref('light')

const systemTheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

const applyTheme = (value, persist = true) => {
    theme.value = value
    document.documentElement.setAttribute('data-theme', value)

    if (persist) {
        storageSet({ theme: value })
    }
}

const toggle = () => {
    applyTheme(theme.value === 'dark' ? 'light' : 'dark')
}

onMounted(async () => {
    applyTheme(systemTheme(), false)

    const result = await storageGet(['theme'])
    applyTheme(result.theme || systemTheme(), false)
})
</script>

<template>
  <button
    type="button"
    class="btn btn-ghost btn-sm btn-square"
    :aria-label="theme === 'dark' ? 'Switch to light' : 'Switch to dark'"
    @click="toggle"
  >
    <Sun v-if="theme === 'dark'" class="size-4" />
    <Moon v-else class="size-4" />
  </button>
</template>
