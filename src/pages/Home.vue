<script setup>
import { ChevronRight } from 'lucide-vue-next'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { isEnabled, loadModifications, setModification } from '@/services/modifications.js'
import { findSite, getGlobalSite, sitesList } from '@/services/settings.js'

const router = useRouter()
const isLoaded = ref(false)
const modifications = reactive({})
const currentSite = ref(null)

const globalSite = getGlobalSite()
const allSites = sitesList()

const otherSites = computed(() =>
    allSites.filter((s) => !s.global && (!currentSite.value || s.key !== currentSite.value.key)),
)

const sitesCount = computed(() => allSites.filter((s) => !s.global).length)

onMounted(async () => {
    Object.assign(modifications, await loadModifications())
    currentSite.value = await detectCurrentSite()
    isLoaded.value = true
})

async function detectCurrentSite() {
    try {
        if (typeof chrome === 'undefined' || !chrome.tabs?.query) return null
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
        const tab = tabs?.[0]
        if (!tab?.url) return null
        let hostname = ''
        try {
            hostname = new URL(tab.url).hostname
        } catch {
            return null
        }
        const matched = findSite(hostname)
        if (!matched || matched.global) return null
        return matched
    } catch (error) {
        console.warn('Could not detect current tab site', error)
        return null
    }
}

const onMasterToggle = async (event, key) => {
    event.stopPropagation()
    await setModification(modifications, key, event.target.checked)
}

const openSite = (key) => {
    router.push({ name: 'site', params: { key } })
}
</script>

<template>
  <div v-if="isLoaded" class="flex w-full min-w-0 flex-col gap-3">
    <div class="card border-base-300 bg-base-100 w-full min-w-0 overflow-hidden border">
      <div class="card-body w-full min-w-0 gap-1 overflow-hidden p-2">
        <p class="text-base-content/60 px-2 pt-1 text-sm">
          Bringing clarity to websites
        </p>

        <ul class="flex w-full min-w-0 list-none flex-col gap-0.5 p-0">
          <li class="w-full min-w-0">
            <div
              class="hover:bg-base-200 flex w-full min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-lg px-2 py-2"
              role="link"
              tabindex="0"
              @click="openSite(globalSite.key)"
              @keydown.enter="openSite(globalSite.key)"
            >
              <label class="flex shrink-0 items-center" @click.stop>
                <input
                  type="checkbox"
                  class="checkbox checkbox-sm checkbox-primary"
                  :checked="isEnabled(modifications, globalSite.key)"
                  @change="onMasterToggle($event, globalSite.key)"
                >
              </label>

              <div class="min-w-0 flex-1 overflow-hidden">
                <div class="truncate font-medium">{{ globalSite.name }}</div>
                <div class="text-base-content/50 truncate text-xs">{{ globalSite.description }}</div>
              </div>

              <RouterLink
                :to="{ name: 'site', params: { key: globalSite.key } }"
                class="btn btn-ghost btn-sm btn-square shrink-0"
                aria-label="Open Global details"
                @click.stop
              >
                <ChevronRight class="size-4" />
              </RouterLink>
            </div>
          </li>

          <li v-if="currentSite" class="w-full min-w-0">
            <div
              class="hover:bg-base-200 flex w-full min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-lg px-2 py-2"
              role="link"
              tabindex="0"
              @click="openSite(currentSite.key)"
              @keydown.enter="openSite(currentSite.key)"
            >
              <label class="flex shrink-0 items-center" @click.stop>
                <input
                  type="checkbox"
                  class="checkbox checkbox-sm checkbox-primary"
                  :checked="isEnabled(modifications, currentSite.key)"
                  @change="onMasterToggle($event, currentSite.key)"
                >
              </label>

              <div class="min-w-0 flex-1 overflow-hidden">
                <div class="flex min-w-0 items-center gap-1.5">
                  <span class="truncate font-medium">{{ currentSite.name }}</span>
                  <span class="badge badge-primary badge-soft badge-xs shrink-0">This page</span>
                </div>
                <div class="text-base-content/50 truncate text-xs">{{ currentSite.description }}</div>
              </div>

              <RouterLink
                :to="{ name: 'site', params: { key: currentSite.key } }"
                class="btn btn-ghost btn-sm btn-square shrink-0"
                aria-label="Open current site details"
                @click.stop
              >
                <ChevronRight class="size-4" />
              </RouterLink>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="card border-base-300 bg-base-100 w-full min-w-0 overflow-hidden border">
      <div class="card-body w-full min-w-0 gap-1 overflow-hidden p-2">
        <p class="text-base-content/60 px-2 pt-1 text-sm">Sites · {{ sitesCount }}</p>

        <ul class="flex w-full min-w-0 list-none flex-col gap-0.5 p-0">
          <li v-for="site in otherSites" :key="site.key" class="w-full min-w-0">
            <div
              class="hover:bg-base-200 flex w-full min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-lg px-2 py-2"
              role="link"
              tabindex="0"
              @click="openSite(site.key)"
              @keydown.enter="openSite(site.key)"
            >
              <label class="flex shrink-0 items-center" @click.stop>
                <input
                  type="checkbox"
                  class="checkbox checkbox-sm checkbox-primary"
                  :checked="isEnabled(modifications, site.key)"
                  @change="onMasterToggle($event, site.key)"
                >
              </label>

              <div class="min-w-0 flex-1 overflow-hidden">
                <div class="truncate font-medium">{{ site.name }}</div>
                <div class="text-base-content/50 truncate text-xs">{{ site.description }}</div>
              </div>

              <RouterLink
                :to="{ name: 'site', params: { key: site.key } }"
                class="btn btn-ghost btn-sm btn-square shrink-0"
                aria-label="Open site details"
                @click.stop
              >
                <ChevronRight class="size-4" />
              </RouterLink>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
