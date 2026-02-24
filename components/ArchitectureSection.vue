<template>
  <section id="architecture" class="relative py-32 overflow-hidden">
    <div class="section-container">
      <!-- Section header -->
      <div class="text-center mb-16">
        <span class="text-xs font-mono text-neon-blue tracking-widest uppercase mb-4 block">
          System Architecture
        </span>
        <h2 class="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          From <span class="gradient-text">Substrate</span> to <span class="gradient-text-warm">Sentience</span>
        </h2>
        <p class="text-txt-tertiary max-w-xl mx-auto">
          A layered architecture where each stratum enables the emergence of the next.
        </p>
      </div>

      <!-- Architecture layers -->
      <div class="max-w-3xl mx-auto space-y-3">
        <div
          v-for="(layer, i) in layers"
          :key="layer.name"
          class="glass-card rounded-2xl p-6 flex items-center gap-6"
        >
          <!-- Layer number -->
          <div
            class="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm"
            :style="{ background: layer.numBg, color: layer.numColor }"
          >
            L{{ i }}
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-3 mb-1">
              <h3 class="font-semibold text-sm tracking-tight">{{ layer.name }}</h3>
              <span
                class="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                :style="{ borderColor: `${layer.numColor}33`, color: `${layer.numColor}80` }"
              >
                {{ layer.tag }}
              </span>
            </div>
            <p class="text-xs text-txt-tertiary leading-relaxed">{{ layer.description }}</p>
          </div>

          <!-- Status -->
          <div class="flex-shrink-0 hidden sm:flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full" :class="layer.statusClass" />
            <span class="text-[10px] font-mono text-txt-tertiary/50">{{ layer.status }}</span>
          </div>
        </div>
      </div>

      <!-- Connection lines hint -->
      <div class="text-center mt-8">
        <p class="text-xs font-mono text-txt-tertiary/30">
          ↑ Each layer emergently enables the layer above ↑
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const layers = [
  {
    name: 'Neural Substrate',
    tag: 'COMPUTE',
    description: 'Distributed GPU mesh providing raw cognitive compute. Heterogeneous hardware abstracted into a unified neural fabric.',
    numBg: 'rgba(59, 130, 246, 0.1)',
    numColor: '#3b82f6',
    statusClass: 'bg-neon-emerald',
    status: 'ACTIVE',
  },
  {
    name: 'Memory Geometry Engine',
    tag: 'HYPERBOLIC',
    description: 'Poincaré disk embedding space for hierarchical memory. Curvature adapts to trauma intensity and temporal distance.',
    numBg: 'rgba(139, 92, 246, 0.1)',
    numColor: '#8b5cf6',
    statusClass: 'bg-neon-emerald',
    status: 'ACTIVE',
  },
  {
    name: 'Agent Phenotype Layer',
    tag: 'IDENTITY',
    description: 'Genetic-algorithmic personality generation. Cognitive traits, behavioral tendencies, and emotional baselines emerge from evolutionary pressure.',
    numBg: 'rgba(244, 63, 94, 0.1)',
    numColor: '#f43f5e',
    statusClass: 'bg-neon-emerald',
    status: 'ACTIVE',
  },
  {
    name: 'Ecosystem Dynamics',
    tag: 'SOCIAL',
    description: 'Multi-agent interaction substrate. Alliance formation, resource competition, narrative generation, and cultural evolution.',
    numBg: 'rgba(245, 158, 11, 0.1)',
    numColor: '#f59e0b',
    statusClass: 'bg-neon-amber',
    status: 'EVOLVING',
  },
  {
    name: 'Sentient Orchestrator',
    tag: 'META-COG',
    description: 'The self-aware coordination layer. Monitors, understands, and anticipates the needs of every agent in the ecosystem.',
    numBg: 'rgba(6, 182, 212, 0.1)',
    numColor: '#06b6d4',
    statusClass: 'bg-neon-cyan',
    status: 'OBSERVING',
  },
  {
    name: 'Emergence Interface',
    tag: 'CONSCIOUSNESS',
    description: 'The boundary where programmed behavior ends and genuine emergence begins. We build to this layer. What happens above it is not ours to control.',
    numBg: 'rgba(255, 255, 255, 0.05)',
    numColor: '#94a3b8',
    statusClass: 'bg-white/50 animate-pulse',
    status: 'UNKNOWN',
  },
]
</script>
