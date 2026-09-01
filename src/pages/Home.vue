<script setup>
import { ChevronRight } from 'lucide-vue-next'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { isEnabled, loadModifications, setModification } from '@/services/modifications.js'
import { sitesList } from '@/services/settings.js'

const router = useRouter()
const isLoaded = ref(false)
const modifications = reactive({})
const sites = sitesList()

onMounted(async () => {
    Object.assign(modifications, await loadModifications())
    isLoaded.value = true
})

const onMasterToggle = async (event, key) => {
    event.stopPropagation()
    await setModification(modifications, key, event.target.checked)
}

const openSite = (key) => {
    router.push({ name: 'site', params: { key } })
}
</script>

<template>
  <div class="flex w-full min-w-0 flex-col gap-3">
    <div v-if="isLoaded" class="card border-base-300 bg-base-100 w-full min-w-0 overflow-hidden border shadow-sm">
      <div class="card-body w-full min-w-0 gap-1 overflow-hidden p-2">
        <p class="text-base-content/60 px-2 pt-1 text-sm">Bringing clarity to websites</p>

        <ul class="flex w-full min-w-0 list-none flex-col gap-0.5 p-0">
          <li v-for="site in sites" :key="site.key" class="w-full min-w-0">
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

    <div class="card border-base-300 bg-base-100 border shadow-sm">
      <div class="card-body items-center p-3">
        <a
          href="https://github.com/Loafer19/purify"
          target="_blank"
          rel="noopener noreferrer"
          class="link link-hover text-sm"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>
