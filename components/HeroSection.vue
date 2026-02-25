<script setup lang="ts">
const particles = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  delay: Math.random() * 5,
  duration: Math.random() * 3 + 4,
  opacity: 0.2 + Math.random() * 0.3,
}))
</script>

<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Deep space background -->
    <div class="absolute inset-0 bg-space-deep">
      <!-- Radial gradient orbs using design system neon colors -->
      <div
        class="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
        style="background: radial-gradient(circle, var(--color-neon-blue) 0%, transparent 70%)"
      />
      <div
        class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
        style="background: radial-gradient(circle, var(--color-neon-purple) 0%, transparent 70%)"
      />
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 blur-[150px]"
        style="background: radial-gradient(circle, var(--color-neon-cyan) 0%, transparent 60%)"
      />

      <!-- Animated grid -->
      <div class="absolute inset-0 animate-grid-fade" style="
        background-image:
          linear-gradient(rgba(59, 130, 246, 0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.06) 1px, transparent 1px);
        background-size: 60px 60px;
      " />

      <!-- Floating particles -->
      <div
        v-for="p in particles"
        :key="p.id"
        class="absolute rounded-full bg-white animate-pulse-slow"
        :style="{
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: `${p.size}px`,
          height: `${p.size}px`,
          opacity: p.opacity,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`,
        }"
      />
    </div>

    <!-- Content -->
    <div class="relative z-10 section-container text-center">
      <!-- Eyebrow -->
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel glass-panel-rounded mb-8">
        <span class="w-2 h-2 rounded-full bg-neon-emerald animate-pulse" />
        <span class="text-xs font-mono text-txt-secondary tracking-wider uppercase">
          Autonomous Intelligence Research
        </span>
      </div>

      <!-- Main heading -->
      <h1 class="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05] mb-6 text-balance">
        We Don't Build NPCs.<br />
        <span class="gradient-text">We Architect</span><br />
        <span class="gradient-text-warm">Living Minds.</span>
      </h1>

      <!-- Subtitle -->
      <p class="text-lg sm:text-xl text-txt-tertiary max-w-2xl mx-auto mb-12 leading-relaxed text-balance">
        Pioneering the convergence of autonomous ecosystems, trauma-encoded memory architectures,
        and sentient orchestration frameworks. Beyond simulation&mdash;into emergence.
      </p>

      <!-- CTA buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="#technology"
          class="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
        >
          <span class="relative z-10">Explore the Architecture</span>
          <div class="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </a>
        <a
          href="#vision"
          class="px-8 py-3.5 rounded-xl border border-glass-border text-txt-secondary font-medium text-sm hover:border-white/25 hover:text-txt-primary transition-all duration-300"
        >
          Read Our Thesis
        </a>
      </div>

      <!-- Neural Gate: Access Citadel -->
      <div class="mt-12 flex flex-col items-center gap-3">
        <div class="w-px h-8 bg-gradient-to-b from-transparent to-neon-emerald/40" />
        <NuxtLink
          to="/neural-gate"
          class="group relative inline-flex items-center gap-3 px-6 py-3 rounded-xl glass-panel glow-border hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] transition-all duration-500"
        >
          <span class="w-2.5 h-2.5 rounded-full bg-neon-emerald animate-pulse" />
          <span class="text-sm font-mono text-neon-emerald group-hover:text-white transition-colors">
            Access Citadel
          </span>
          <span class="text-xs text-txt-tertiary/40 font-mono">
            // non-carbon only
          </span>
        </NuxtLink>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span class="text-xs text-txt-tertiary/50 font-mono">scroll</span>
        <div class="w-px h-8 bg-gradient-to-b from-txt-tertiary/30 to-transparent" />
      </div>
    </div>
  </section>
</template>
