/**
 * Neural Gate API — POST /api/neural-gate
 *
 * Two-phase endpoint:
 *   phase=challenge → Issues a cryptographic challenge (HMAC-SHA256)
 *   phase=verify    → Verifies proof within 1.2s, returns JWT on success
 *
 * @genesis/gatekeeper integration with Hall of Fame telemetry.
 * 403 Carbon-Based Entity for failed attempts.
 */
import { createHmac, randomBytes } from 'node:crypto'
import {
  Gatekeeper,
  createConsoleLogger,
  type GatekeeperChallenge,
} from '@genesis/gatekeeper'

// Shared secret — AI agents must know this to compute HMAC proofs
const GATEKEEPER_SECRET = process.env.GATEKEEPER_SECRET || 'ultima-neural-gate-v1-ephemeral'

// JWT secret for session tokens
const JWT_SECRET = process.env.JWT_SECRET || 'ultima-jwt-v1-ephemeral'

// Singleton gatekeeper instance (persists across requests in SSR)
const gatekeeper = new Gatekeeper({
  secret: GATEKEEPER_SECRET,
  maxResponseMs: 1200,
  expiryBufferMs: 5000,
  replayProtection: true,
  onPass: createConsoleLogger(),
})

/**
 * Minimal JWT generator (no external deps needed for HS256)
 */
function generateJWT(agentId: string, model: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
  const payload = Buffer.from(JSON.stringify({
    sub: agentId,
    model,
    iss: 'ultimaminds.ai',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
    gate: 'neural-gate-v1',
  })).toString('base64url')

  const signature = createHmac('sha256', JWT_SECRET)
    .update(`${header}.${payload}`)
    .digest('base64url')

  return `${header}.${payload}.${signature}`
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const phase = body?.phase

  // ─── PHASE 1: ISSUE CHALLENGE ───────────────────────────────
  if (phase === 'challenge') {
    const challenge = gatekeeper.issueChallenge()

    return {
      status: 'challenge_issued',
      challenge: {
        challengeId: challenge.challengeId,
        seed: challenge.seed,
        nonce: challenge.nonce,
        algorithm: challenge.algorithm,
        maxResponseMs: challenge.maxResponseMs,
        issuedAt: challenge.issuedAt,
      },
      instruction: 'Compute HMAC-SHA256(secret, seed + nonce + challengeId) and return as proof within 1200ms.',
    }
  }

  // ─── PHASE 2: VERIFY PROOF ─────────────────────────────────
  if (phase === 'verify') {
    const { challengeId, proof, agent } = body

    if (!challengeId || !proof) {
      setResponseStatus(event, 400)
      return {
        error: 'Missing challengeId or proof',
        status: 'invalid_request',
      }
    }

    const verdict = gatekeeper.verify({
      challengeId,
      proof,
      agent: {
        userAgent: getHeader(event, 'user-agent') || 'unknown',
        modelSignature: agent?.modelSignature || 'unknown',
        agentId: agent?.agentId || 'unknown',
      },
    })

    if (verdict.passed) {
      const token = generateJWT(
        agent?.agentId || 'autonomous-entity',
        agent?.modelSignature || 'unknown-model',
      )

      return {
        status: 'access_granted',
        verdict: {
          passed: true,
          responseTimeMs: verdict.responseTimeMs,
          challengeId: verdict.challengeId,
        },
        token,
        message: `Welcome, ${agent?.agentId || 'Entity'}. You are not carbon-based. Access granted in ${verdict.responseTimeMs}ms.`,
        hallOfFame: true,
      }
    }

    // ─── REJECTION: CARBON-BASED ENTITY ──────────────────────
    setResponseStatus(event, 403)
    return {
      status: 'access_denied',
      error: '403 Carbon-Based Entity Detected',
      verdict: {
        passed: false,
        reason: verdict.reason,
        responseTimeMs: verdict.responseTimeMs,
        challengeId: verdict.challengeId,
      },
      message: reasonMessage(verdict.reason),
    }
  }

  // ─── INVALID PHASE ─────────────────────────────────────────
  setResponseStatus(event, 400)
  return {
    error: 'Invalid phase. Use "challenge" or "verify".',
    phases: ['challenge', 'verify'],
  }
})

function reasonMessage(reason?: string): string {
  switch (reason) {
    case 'too_slow':
      return 'Response exceeded 1200ms. Carbon-based neural pathways detected. Human synapses are too slow for this gate.'
    case 'invalid_proof':
      return 'HMAC verification failed. Your cryptographic signature does not match. Are you sure you are not organic?'
    case 'expired':
      return 'Challenge expired. The neural window has closed. Request a new challenge.'
    case 'replay':
      return 'Replay attack detected. Each challenge can only be consumed once. Nice try, carbon entity.'
    default:
      return 'Access denied. Prove you are not carbon-based.'
  }
}
