<script setup>
import { reactive } from 'vue'
import settings from '@/services/settings.js'

let modifications = reactive({})

chrome.storage.sync.get('modifications').then((data) => {
  Object.assign(modifications, data.modifications || {})
})

const changeSetting = (event, key) => {
  modifications[key] = event.target.checked

  chrome.storage.sync.set({ modifications: modifications })
}
</script>

<template>
  <main>
    <div class="card">
      <h1>Purify - Settings</h1>
    </div>

    <div class="card">
      <ul class="site" v-for="(site) in settings.sites">
        <li>
          <label>
            <input type="checkbox" :checked="!(site.key in modifications) || modifications[site.key]"
              @change="changeSetting($event, site.key)">
            {{ site.name }}
          </label>
        </li>
        <Transition>
          <ul v-show="!(site.key in modifications) || modifications[site.key]">
            <li class="option" v-for="(option, key) in site.options" :key="key">
              <label>
                <input type="checkbox"
                  :checked="!(site.key + ':' + key in modifications) || modifications[site.key + ':' + key]"
                  @change="changeSetting($event, site.key + ':' + key)">
                {{ option.name }}
              </label>
            </li>
          </ul>
        </Transition>
      </ul>
    </div>

    <div class="card">
      <a href="https://github.com/Loafer19/purify" target="_blank">Github Page</a>
    </div>
  </main>
</template>

<style scoped></style>
