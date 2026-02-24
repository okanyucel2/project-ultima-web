<template>
  <section id="contact" class="relative py-32 overflow-hidden">
    <!-- Background -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-10 blur-[160px]"
      style="background: radial-gradient(ellipse, var(--color-neon-blue) 0%, var(--color-neon-purple) 50%, transparent 70%)"
    />

    <div class="section-container text-center">
      <span class="text-xs font-mono text-neon-blue tracking-widest uppercase mb-4 block">
        Join the Research
      </span>
      <h2 class="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
        The Next Mind <span class="gradient-text">Starts Here</span>
      </h2>
      <p class="text-txt-tertiary max-w-lg mx-auto mb-12">
        We're building something that has never existed before. If that excites you more than it
        terrifies you, we should talk.
      </p>

      <!-- Glass CTA card -->
      <div class="glass-panel glass-panel-rounded max-w-md mx-auto p-8 glow-border">
        <div class="space-y-4">
          <div class="flex items-center gap-3 justify-center text-sm text-txt-secondary">
            <span class="w-2 h-2 rounded-full bg-neon-emerald animate-pulse" />
            <span>Accepting research collaborators</span>
          </div>

          <a
            href="mailto:research@projectultima.ai"
            class="block w-full py-3.5 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium text-sm hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300"
          >
            research@ultimaminds.ai
          </a>

          <p class="text-[10px] font-mono text-txt-tertiary/30 mt-4">
            PGP: 4A7F 2B1C 8E3D ... &middot; Signal available upon request
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
