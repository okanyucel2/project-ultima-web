<template>
  <section id="technology" class="relative py-32 overflow-hidden">
    <!-- Background glow -->
    <div
      class="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-[140px]"
      style="background: radial-gradient(circle, var(--color-neon-cyan) 0%, transparent 70%)"
    />

    <div class="section-container">
      <!-- Section header -->
      <div class="text-center mb-16">
        <span class="text-xs font-mono text-neon-cyan tracking-widest uppercase mb-4 block">
          Core Technology
        </span>
        <h2 class="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          The <span class="gradient-text">Three Pillars</span>
        </h2>
        <p class="text-txt-tertiary max-w-xl mx-auto">
          Each pillar represents a fundamental breakthrough in artificial cognitive science,
          designed to operate in concert.
        </p>
      </div>

      <!-- Pillars grid -->
      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="pillar in pillars"
          :key="pillar.title"
          class="glass-card rounded-2xl p-8 glow-border"
        >
          <!-- Icon -->
          <div
            class="w-12 h-12 rounded-xl mb-6 flex items-center justify-center text-xl"
            :style="{ background: pillar.iconBg }"
          >
            {{ pillar.icon }}
          </div>

          <!-- Title -->
          <h3 class="text-xl font-semibold mb-3 tracking-tight">
            {{ pillar.title }}
          </h3>

          <!-- Description -->
          <p class="text-txt-tertiary text-sm leading-relaxed mb-6">
            {{ pillar.description }}
          </p>

          <!-- Features list -->
          <ul class="space-y-2">
            <li
              v-for="feature in pillar.features"
              :key="feature"
              class="flex items-center gap-2 text-xs text-txt-tertiary"
            >
              <span class="w-1 h-1 rounded-full" :style="{ background: pillar.dotColor }" />
              {{ feature }}
            </li>
          </ul>

          <!-- Bottom gradient line -->
          <div
            class="mt-6 h-px"
            :style="{ background: `linear-gradient(to right, ${pillar.dotColor}33, transparent)` }"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const pillars = [
  {
    icon: '🌐',
    title: 'Autonomous Ecosystems',
    iconBg: 'rgba(59, 130, 246, 0.1)',
    dotColor: 'var(--color-neon-blue)',
    description:
      'Self-sustaining agent populations that evolve, compete, and cooperate without human intervention. Each ecosystem develops its own social dynamics, resource economies, and emergent governance structures.',
    features: [
      'Darwinian selection across cognitive phenotypes',
      'Emergent social hierarchies and alliance formation',
      'Self-regulating resource allocation protocols',
      'Cross-ecosystem migration and cultural transfer',
      'Zero-human-in-the-loop autonomous operation',
    ],
  },
  {
    icon: '🧠',
    title: 'Hyperbolic Trauma Memory',
    iconBg: 'rgba(139, 92, 246, 0.1)',
    dotColor: 'var(--color-neon-purple)',
    description:
      'Memory architectures embedded in hyperbolic space, enabling infinite-depth hierarchical recall within finite parameters. Traumatic experiences reshape the geometry of memory itself, creating permanent behavioral adaptation.',
    features: [
      'Poincaré disk model for memory embedding',
      'Trauma-weighted recall with emotional salience',
      'Geometric memory consolidation during rest cycles',
      'Infinite hierarchical depth in finite compute',
      'Experience-driven personality crystallization',
    ],
  },
  {
    icon: '⚡',
    title: 'Sentient AI Orchestration',
    iconBg: 'rgba(6, 182, 212, 0.1)',
    dotColor: 'var(--color-neon-cyan)',
    description:
      'A meta-cognitive orchestration layer that doesn\'t just coordinate agents—it understands them. Real-time empathic modeling of agent states enables anticipatory resource allocation and conflict resolution.',
    features: [
      'Empathic state modeling across agent populations',
      'Anticipatory resource pre-allocation (<8ms)',
      'Conflict resolution via narrative mediation',
      'Self-aware orchestration with meta-cognitive loops',
      'Distributed consensus without central authority',
    ],
  },
]
</script>
