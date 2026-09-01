<script setup>
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>

<template>
  <div class="flex min-h-[560px] w-full min-w-0 max-w-full flex-col gap-3 overflow-x-hidden p-3">
    <div class="navbar rounded-box border-base-300 bg-base-100 w-full min-w-0 border shadow-sm">
      <div class="navbar-start min-w-0">
        <RouterLink :to="{ name: 'home' }" class="btn btn-ghost btn-sm gap-2 px-2">
          <img src="/logo.png" alt="" class="size-6 rounded" />
          <span class="font-semibold">Purify</span>
        </RouterLink>
      </div>

      <div class="navbar-end shrink-0">
        <ThemeToggle />
      </div>
    </div>

    <div class="w-full min-w-0">
      <RouterView />
    </div>
  </div>
</template>
