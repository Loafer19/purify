<script setup>
import { Moon, Sun } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'
import { storageGet, storageRemove, storageSet } from '@/services/storage'

const theme = ref('light')
/** User picked light/dark; when false we follow the OS. */
const manual = ref(false)

let media = null

const systemTheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

const paint = (value) => {
    theme.value = value
    document.documentElement.setAttribute('data-theme', value)
}

const applySystem = () => {
    manual.value = false
    paint(systemTheme())
}

const applyManual = async (value) => {
    manual.value = true
    paint(value)
    await storageSet({ theme: value })
}

const toggle = async () => {
    const next = theme.value === 'dark' ? 'light' : 'dark'
    await applyManual(next)
}

const onSystemChange = () => {
    if (!manual.value) {
        paint(systemTheme())
    }
}

onMounted(async () => {
    media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', onSystemChange)

    const result = await storageGet(['theme'])
    if (result.theme === 'light' || result.theme === 'dark') {
        await applyManual(result.theme)
        return
    }

    // No saved choice — stay on system (and clear stale values).
    await storageRemove(['theme'])
    applySystem()
})

onUnmounted(() => {
    media?.removeEventListener('change', onSystemChange)
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
