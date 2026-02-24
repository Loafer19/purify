<script setup>
const props = defineProps({
    site: { type: Object, required: true },
    modifications: { type: Object, required: true },
})

const emit = defineEmits(['change'])

const isEnabled = (key) => !(key in props.modifications) || props.modifications[key]
</script>

<template>
  <ul class="site">
    <li>
      <label>
        <input type="checkbox" :checked="isEnabled(site.key)" @change="emit('change', $event, site.key)">
        {{ site.name }}
      </label>
    </li>
    <Transition>
      <ul v-show="isEnabled(site.key)">
        <li v-for="(option, key) in site.options" :key="key" class="option">
          <label>
            <input
              type="checkbox"
              :checked="isEnabled(`${site.key}:${key}`)"
              @change="emit('change', $event, `${site.key}:${key}`)"
            >
            {{ option.name }}
          </label>
        </li>
      </ul>
    </Transition>
  </ul>
</template>
