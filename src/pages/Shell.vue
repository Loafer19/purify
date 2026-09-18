<script setup>
import { Send } from 'lucide-vue-next'
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>

<template>
  <div class="flex h-full w-full min-w-0 max-w-full flex-col gap-3 overflow-hidden p-3">
    <div class="navbar rounded-box border-base-300 bg-base-100 w-full min-w-0 shrink-0 border">
      <div class="navbar-start min-w-0">
        <a
          href="https://github.com/Loafer19/purify"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-ghost btn-sm gap-2 px-2"
          aria-label="Purify on GitHub"
        >
          <img src="/logo.png" alt="" class="size-10" />
          <span class="font-semibold">Purify</span>
        </a>
      </div>

      <div class="navbar-end shrink-0">
        <ThemeToggle />
      </div>
    </div>

    <div class="purify-scroll flex w-full min-h-0 min-w-0 flex-1 flex-col gap-3 overflow-x-hidden overflow-y-auto pr-1">
      <div class="w-full min-w-0">
        <RouterView />
      </div>

      <a
        href="https://t.me/Loafer19"
        target="_blank"
        rel="noopener noreferrer"
        class="border-base-300 bg-base-100 text-base-content/70 hover:bg-base-200 hover:text-base-content flex w-full min-w-0 shrink-0 items-start gap-2.5 rounded-box border px-3 py-2.5 text-xs leading-snug transition-colors"
      >
        <Send class="text-primary mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <span class="min-w-0">
          Want new sites or have ideas?
          <span class="text-base-content font-medium">Message @Loafer19</span>
        </span>
      </a>
    </div>
  </div>
</template>
