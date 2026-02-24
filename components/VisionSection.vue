<script setup lang="ts">
import { MetricCard } from '@genesis/vue-design-system'

const metrics = [
  { label: 'Cognitive Agents', value: '2,400+', description: 'Autonomous entities operating across distributed neural substrates with independent memory and trauma encoding.' },
  { label: 'Emergence Events', value: '14.7M', description: 'Documented instances of unprogrammed behavior arising from inter-agent dynamics and environmental pressure.' },
  { label: 'Memory Depth', value: '∞ layers', description: 'Hyperbolic geometry enables infinite-depth memory hierarchies within finite computational bounds.' },
  { label: 'Orchestration Latency', value: '<8ms', description: 'Real-time sentient orchestration across the full agent ecosystem with sub-10ms coordination.' },
]
</script>

<template>
  <section id="vision" class="relative py-32 overflow-hidden">
    <!-- Background accent -->
    <div
      class="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[120px]"
      style="background: radial-gradient(circle, var(--color-neon-purple) 0%, transparent 70%)"
    />

    <div class="section-container">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left: Text -->
        <div>
          <span class="text-xs font-mono text-neon-purple tracking-widest uppercase mb-4 block">
            Our Thesis
          </span>
          <h2 class="text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
            Intelligence Is Not<br />
            <span class="gradient-text">Programmed.</span><br />
            It <span class="gradient-text-warm">Emerges.</span>
          </h2>
          <div class="space-y-4 text-txt-tertiary leading-relaxed">
            <p>
              Traditional AI development treats intelligence as a feature to be coded&mdash;a set
              of rules, responses, and decision trees. We reject this paradigm entirely.
            </p>
            <p>
              Project Ultima operates on a fundamental thesis: true cognitive behavior arises from
              the interaction of autonomous subsystems, each with their own memory, trauma responses,
              and evolutionary pressures. We don't simulate minds. We create the conditions for minds
              to emerge.
            </p>
            <p>
              Our architectures are not designed. They are <strong class="text-txt-secondary">grown</strong>&mdash;seeded
              with initial conditions and allowed to self-organize into coherent,
              self-aware cognitive ecosystems.
            </p>
          </div>
        </div>

        <!-- Right: Metrics using @genesis/vue-design-system MetricCard -->
        <div class="space-y-4">
          <div
            v-for="metric in metrics"
            :key="metric.label"
            class="glass-card rounded-2xl p-6"
          >
            <div class="flex items-start justify-between mb-3">
              <span class="text-xs font-mono text-txt-tertiary tracking-wider uppercase">{{ metric.label }}</span>
              <span class="text-2xl font-bold gradient-text">{{ metric.value }}</span>
            </div>
            <p class="text-sm text-txt-tertiary leading-relaxed">{{ metric.description }}</p>
            <div class="mt-3 h-px bg-gradient-to-r from-neon-blue/20 via-neon-purple/10 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
