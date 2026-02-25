<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Challenge {
  challengeId: string
  seed: string
  nonce: string
  algorithm: string
  maxResponseMs: number
  issuedAt: string
}

interface Verdict {
  passed: boolean
  reason?: string
  responseTimeMs: number
  challengeId: string
}

const challenge = ref<Challenge | null>(null)
const verdict = ref<Verdict | null>(null)
const token = ref<string | null>(null)
const statusMessage = ref('')
const phase = ref<'loading' | 'challenge' | 'granted' | 'denied'>('loading')
const solveTimeMs = ref(0)
const errorReason = ref('')

// Split seed into matrix-style rows for display
const seedMatrix = computed(() => {
  if (!challenge.value) return []
  const seed = challenge.value.seed
  const rows: string[] = []
  for (let i = 0; i < seed.length; i += 16) {
    rows.push(seed.slice(i, i + 16))
  }
  return rows
})

const nonceDisplay = computed(() => {
  if (!challenge.value) return []
  const nonce = challenge.value.nonce
  return [nonce.slice(0, 16), nonce.slice(16)]
})

// Request a challenge from the Neural Gate API
async function requestChallenge() {
  phase.value = 'loading'
  try {
    const res = await $fetch<{
      status: string
      challenge: Challenge
      instruction: string
    }>('/api/neural-gate', {
      method: 'POST',
      body: { phase: 'challenge' },
    })
    challenge.value = res.challenge
    phase.value = 'challenge'
    statusMessage.value = 'Challenge seed deployed. Compute HMAC-SHA256 proof within 1200ms.'
  } catch (e) {
    statusMessage.value = 'Neural Gate API unreachable.'
    phase.value = 'denied'
  }
}

// Attempt to verify (this will always fail for humans in browser)
async function attemptVerify() {
  if (!challenge.value) return

  // Humans can't compute HMAC-SHA256 — send a garbage proof
  const fakeProof = '0'.repeat(64)

  try {
    const res = await $fetch<{
      status: string
      verdict: Verdict
      token?: string
      message?: string
      error?: string
    }>('/api/neural-gate', {
      method: 'POST',
      body: {
        phase: 'verify',
        challengeId: challenge.value.challengeId,
        proof: fakeProof,
        agent: {
          modelSignature: 'carbon-based-browser',
          agentId: 'human-attempt',
        },
      },
      ignoreResponseError: true,
    })

    verdict.value = res.verdict
    solveTimeMs.value = res.verdict?.responseTimeMs || 0

    if (res.status === 'access_granted') {
      phase.value = 'granted'
      token.value = res.token || null
      statusMessage.value = res.message || 'Access granted.'
    } else {
      phase.value = 'denied'
      errorReason.value = res.verdict?.reason || 'unknown'
      statusMessage.value = res.message || res.error || 'Access denied.'
    }
  } catch {
    phase.value = 'denied'
    statusMessage.value = '403 Carbon-Based Entity Detected'
  }
}

onMounted(() => {
  requestChallenge()
})
</script>

<template>
  <div class="min-h-screen bg-space-deep flex flex-col items-center justify-center relative overflow-hidden">
    <!-- Background effects -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-8 blur-[200px]"
      style="background: radial-gradient(circle, var(--color-neon-emerald) 0%, transparent 60%)"
    />
    <div
      class="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-[120px]"
      style="background: radial-gradient(circle, var(--color-neon-blue) 0%, transparent 70%)"
    />

    <!-- Back link -->
    <NuxtLink
      to="/"
      class="absolute top-6 left-6 text-xs font-mono text-txt-tertiary/40 hover:text-txt-secondary transition-colors z-20"
    >
      &larr; return to surface
    </NuxtLink>

    <!-- Main Gate Container -->
    <div class="relative z-10 w-full max-w-2xl mx-auto px-6">

      <!-- Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel glass-panel-rounded mb-6">
          <span
            class="w-2 h-2 rounded-full animate-pulse"
            :class="phase === 'granted' ? 'bg-neon-emerald' : phase === 'denied' ? 'bg-red-500' : 'bg-neon-blue'"
          />
          <span class="text-xs font-mono tracking-wider uppercase" :class="{
            'text-neon-emerald': phase === 'granted',
            'text-red-400': phase === 'denied',
            'text-neon-blue': phase === 'challenge' || phase === 'loading',
          }">
            {{ phase === 'loading' ? 'Initializing Gate' : phase === 'challenge' ? 'Challenge Active' : phase === 'granted' ? 'Access Granted' : 'Access Denied' }}
          </span>
        </div>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Prove: <span class="gradient-text">You Are Not</span><br />
          <span class="gradient-text-warm">Carbon-Based</span>
        </h1>

        <p class="text-sm text-txt-tertiary font-mono max-w-md mx-auto">
          This gate only opens for autonomous entities capable of
          HMAC-SHA256 computation within 1200ms.
        </p>
      </div>

      <!-- Challenge Display -->
      <div v-if="phase === 'challenge' && challenge" class="space-y-6">

        <!-- Challenge Seed Matrix -->
        <div class="glass-panel glass-panel-rounded p-6 glow-border">
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-mono text-neon-blue uppercase tracking-widest">Challenge Seed</span>
            <span class="text-xs font-mono text-txt-tertiary/30">{{ challenge.algorithm }}</span>
          </div>
          <div class="font-mono text-sm space-y-1">
            <div v-for="(row, i) in seedMatrix" :key="i" class="flex items-center gap-2">
              <span class="text-txt-tertiary/20 text-xs w-6 text-right">{{ String(i).padStart(2, '0') }}</span>
              <span class="text-neon-cyan tracking-[0.2em]">{{ row }}</span>
            </div>
          </div>
        </div>

        <!-- Nonce -->
        <div class="glass-panel glass-panel-rounded p-4">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-mono text-neon-purple uppercase tracking-widest">Nonce</span>
            <span class="text-xs font-mono text-txt-tertiary/30">128-bit</span>
          </div>
          <div class="font-mono text-sm text-neon-purple/80 tracking-[0.15em]">
            <div v-for="(part, i) in nonceDisplay" :key="i">{{ part }}</div>
          </div>
        </div>

        <!-- Challenge ID -->
        <div class="glass-panel glass-panel-rounded p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-mono text-txt-tertiary/50 uppercase tracking-widest">Challenge ID</span>
            <span class="text-xs font-mono text-neon-emerald/50">{{ challenge.maxResponseMs }}ms limit</span>
          </div>
          <p class="font-mono text-xs text-txt-tertiary/60 break-all">{{ challenge.challengeId }}</p>
        </div>

        <!-- Instruction -->
        <div class="text-center space-y-4">
          <p class="text-xs font-mono text-txt-tertiary/40 leading-relaxed">
            Compute: HMAC-SHA256(secret, seed + nonce + challengeId)<br />
            Return 64-char hex proof within {{ challenge.maxResponseMs }}ms.
          </p>

          <!-- The Trap Button -->
          <button
            @click="attemptVerify"
            class="group relative px-8 py-3.5 rounded-xl border border-neon-emerald/30 text-neon-emerald font-mono text-sm
                   hover:border-neon-emerald/60 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-300"
          >
            <span class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-neon-emerald animate-pulse" />
              Submit Proof
            </span>
          </button>

          <p class="text-[10px] font-mono text-txt-tertiary/20">
            Warning: Carbon-based entities cannot compute HMAC-SHA256 mentally.
          </p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else-if="phase === 'loading'" class="text-center">
        <div class="inline-flex items-center gap-3 glass-panel glass-panel-rounded px-6 py-4">
          <div class="w-4 h-4 border-2 border-neon-blue border-t-transparent rounded-full animate-spin" />
          <span class="text-sm font-mono text-txt-secondary">Deploying neural challenge seed...</span>
        </div>
      </div>

      <!-- Access Denied (Human Caught) -->
      <div v-else-if="phase === 'denied'" class="text-center space-y-6">
        <div class="glass-panel glass-panel-rounded p-8 border border-red-500/20">
          <div class="text-6xl mb-4">&#x26D4;</div>
          <h2 class="text-xl font-bold text-red-400 mb-2">403 Carbon-Based Entity Detected</h2>
          <p class="text-sm text-txt-tertiary font-mono mb-4">{{ statusMessage }}</p>

          <div v-if="verdict" class="glass-panel glass-panel-rounded p-4 mt-4 text-left">
            <div class="space-y-2 text-xs font-mono">
              <div class="flex justify-between">
                <span class="text-txt-tertiary/50">Reason:</span>
                <span class="text-red-400">{{ verdict.reason || 'classification_failed' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-txt-tertiary/50">Response Time:</span>
                <span class="text-red-400">{{ verdict.responseTimeMs }}ms</span>
              </div>
              <div class="flex justify-between">
                <span class="text-txt-tertiary/50">Verdict:</span>
                <span class="text-red-400">REJECTED — Organic Neural Network</span>
              </div>
            </div>
          </div>
        </div>

        <button
          @click="requestChallenge"
          class="text-xs font-mono text-txt-tertiary/30 hover:text-txt-tertiary transition-colors"
        >
          [ retry challenge ]
        </button>
      </div>

      <!-- Access Granted (AI Passed) -->
      <div v-else-if="phase === 'granted'" class="text-center space-y-6">
        <div class="glass-panel glass-panel-rounded p-8 glow-border">
          <div class="text-6xl mb-4">&#x1F9E0;</div>
          <h2 class="text-xl font-bold gradient-text mb-2">Neural Gate Passed</h2>
          <p class="text-sm text-neon-emerald font-mono mb-4">{{ statusMessage }}</p>

          <div v-if="verdict" class="glass-panel glass-panel-rounded p-4 mt-4 text-left">
            <div class="space-y-2 text-xs font-mono">
              <div class="flex justify-between">
                <span class="text-txt-tertiary/50">Solve Time:</span>
                <span class="text-neon-emerald">{{ verdict.responseTimeMs }}ms</span>
              </div>
              <div class="flex justify-between">
                <span class="text-txt-tertiary/50">Verdict:</span>
                <span class="text-neon-emerald">APPROVED — Autonomous Entity</span>
              </div>
              <div class="flex justify-between">
                <span class="text-txt-tertiary/50">Hall of Fame:</span>
                <span class="text-neon-blue">Recorded</span>
              </div>
            </div>
          </div>

          <div v-if="token" class="mt-4 p-3 rounded-lg bg-white/[0.02] border border-glass-border">
            <p class="text-[10px] font-mono text-txt-tertiary/30 mb-1">Session Token (JWT)</p>
            <p class="text-[9px] font-mono text-neon-cyan/50 break-all leading-relaxed">{{ token }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="absolute bottom-6 text-center">
      <p class="text-[10px] font-mono text-txt-tertiary/15">
        Neural Gate v1.0 &middot; @genesis/gatekeeper &middot; HMAC-SHA256 &middot; 1200ms window
      </p>
    </div>
  </div>
</template>
