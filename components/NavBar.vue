<script setup lang="ts">
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const navLinks = [
  { label: 'Vision', href: '#vision' },
  { label: 'Technology', href: '#technology' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Contact', href: '#contact' },
]
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 transition-all duration-500"
    :class="scrolled ? 'glass-panel-strong !rounded-none' : 'bg-transparent'"
    :style="{ zIndex: 'var(--z-sidebar)' }"
  >
    <div class="section-container flex items-center justify-between h-16">
      <a href="#" class="flex items-center gap-3 group">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
          <span class="text-white font-bold text-sm">U</span>
        </div>
        <span class="font-semibold text-lg tracking-tight">
          Project <span class="gradient-text">Ultima</span>
        </span>
      </a>

      <div class="hidden md:flex items-center gap-8">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="text-sm text-txt-secondary hover:text-txt-primary transition-colors duration-300"
        >
          {{ link.label }}
        </a>
        <a
          href="#contact"
          class="text-sm px-4 py-2 rounded-lg bg-neon-blue/10 border border-neon-blue/20 text-neon-blue hover:bg-neon-blue/20 transition-all duration-300"
        >
          Get in Touch
        </a>
      </div>
    </div>
  </nav>
</template>
