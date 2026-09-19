<script setup>
import { ArrowLeft } from 'lucide-vue-next'
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
    CUSTOM_CSS_SOFT_LIMIT,
    isEnabled,
    loadCustomCss,
    loadModifications,
    saveCustomCss,
    setModification,
} from '@/services/modifications.js'
import { sitesList } from '@/services/settings.js'

const route = useRoute()
const isLoaded = ref(false)
const modifications = reactive({})
const customCss = ref('')
const cssStatus = ref('')
const cssError = ref('')
let saveTimer = null

const site = computed(() => sitesList().find((s) => s.key === route.params.key))

const siteEnabled = computed(() => (site.value ? isEnabled(modifications, site.value.key) : false))

const screenshotSrc = computed(() => (site.value?.screenshot ? `/${site.value.screenshot}` : null))

const options = computed(() => {
    if (!site.value?.options) return []
    return Object.entries(site.value.options).map(([key, option]) => ({
        key: `${site.value.key}:${key}`,
        name: option.name,
        hint: option.hint,
    }))
})

const cssBytes = computed(() => new TextEncoder().encode(customCss.value || '').length)
const cssNearLimit = computed(() => cssBytes.value >= CUSTOM_CSS_SOFT_LIMIT)

async function hydrate(siteKey) {
    Object.assign(modifications, await loadModifications())
    customCss.value = await loadCustomCss(siteKey)
    cssStatus.value = ''
    cssError.value = ''
    isLoaded.value = true
}

onMounted(async () => {
    if (site.value) await hydrate(site.value.key)
    else isLoaded.value = true
})

watch(
    () => route.params.key,
    async (key) => {
        if (!key) return
        isLoaded.value = false
        if (saveTimer) {
            clearTimeout(saveTimer)
            saveTimer = null
        }
        await hydrate(String(key))
    },
)

onBeforeUnmount(() => {
    if (saveTimer) clearTimeout(saveTimer)
})

const onToggle = async (key, event) => {
    await setModification(modifications, key, event.target.checked)
}

const onCssInput = () => {
    cssStatus.value = 'Saving…'
    cssError.value = ''
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(async () => {
        if (!site.value) return
        try {
            await saveCustomCss(site.value.key, customCss.value)
            cssStatus.value = customCss.value.trim() ? 'Saved (syncs with Chrome)' : 'Cleared'
        } catch (error) {
            cssStatus.value = ''
            cssError.value =
                error?.message?.includes('QUOTA') || error?.message?.includes('quota')
                    ? 'Sync quota exceeded — shorten the CSS (max ~8 KB per site).'
                    : 'Could not save custom CSS.'
            console.error(error)
        }
    }, 450)
}
</script>

<template>
  <div v-if="!site" class="card border-base-300 bg-base-100 border">
    <div class="card-body gap-3 p-4">
      <div class="flex items-center gap-2">
        <RouterLink :to="{ name: 'home' }" class="btn btn-ghost btn-sm btn-square" aria-label="Back">
          <ArrowLeft class="size-4" />
        </RouterLink>
        <h1 class="card-title text-lg">Site not found</h1>
      </div>
      <p class="text-base-content/70 text-sm">No site matches this key.</p>
      <RouterLink :to="{ name: 'home' }" class="btn btn-primary btn-sm w-fit">Back to home</RouterLink>
    </div>
  </div>

  <div v-else-if="isLoaded" class="card border-base-300 bg-base-100 border">
    <div class="card-body gap-4 p-4">
      <div class="flex items-center gap-2">
        <RouterLink :to="{ name: 'home' }" class="btn btn-ghost btn-sm btn-square" aria-label="Back">
          <ArrowLeft class="size-4" />
        </RouterLink>
        <h1 class="card-title text-lg">{{ site.name }}</h1>
      </div>

      <figure v-if="screenshotSrc" class="overflow-hidden rounded-box border-base-300 border">
        <img :src="screenshotSrc" :alt="`${site.name} preview`" class="max-h-48 w-full object-cover object-top">
      </figure>

      <p class="text-base-content/80 text-sm leading-relaxed">{{ site.description }}</p>

      <ul v-if="site.highlights?.length" class="flex w-full min-w-0 flex-wrap gap-1.5">
        <li
          v-for="(item, i) in site.highlights"
          :key="i"
          class="badge badge-soft badge-sm h-auto max-w-full whitespace-normal px-2.5 py-1 text-left leading-snug"
        >
          {{ item }}
        </li>
      </ul>

      <label class="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          class="toggle toggle-primary"
          :checked="siteEnabled"
          @change="onToggle(site.key, $event)"
        >
        <span class="font-medium">Enable {{ site.name }}</span>
      </label>

      <div class="divider my-0 text-xs">Options</div>

      <ul class="flex list-none flex-col gap-3" :class="{ 'pointer-events-none opacity-50': !siteEnabled }">
        <li v-for="option in options" :key="option.key">
          <label class="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              class="checkbox checkbox-sm checkbox-primary mt-0.5"
              :checked="isEnabled(modifications, option.key)"
              @change="onToggle(option.key, $event)"
            >
            <span class="flex min-w-0 flex-col gap-0.5">
              <span class="text-sm font-medium">{{ option.name }}</span>
              <span v-if="option.hint" class="text-base-content/50 text-xs leading-snug">{{ option.hint }}</span>
            </span>
          </label>
        </li>
      </ul>

      <div class="divider my-0 text-xs">Custom CSS</div>

      <div class="flex flex-col gap-2" :class="{ 'pointer-events-none opacity-50': !siteEnabled }">
        <p class="text-base-content/50 text-xs leading-snug">
          Extra CSS for this site, applied after built-in rules. Syncs with your Chrome account (~8 KB max per site).
        </p>
        <textarea
          v-model="customCss"
          class="textarea textarea-bordered font-mono text-xs leading-snug min-h-28 w-full"
          placeholder=".annoying-banner { display: none !important; }"
          spellcheck="false"
          @input="onCssInput"
        />
        <div class="text-base-content/50 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span :class="{ 'text-warning': cssNearLimit }">{{ cssBytes }} / 8192 bytes</span>
          <span v-if="cssStatus" class="text-success">{{ cssStatus }}</span>
          <span v-if="cssError" class="text-error">{{ cssError }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
