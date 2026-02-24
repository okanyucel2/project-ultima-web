# Project Ultima Web - CLAUDE.md

## Identity
- **Agent:** ultima-web-worker
- **Project:** Project Ultima - Corporate Landing Page
- **Parent:** Genesis v3.2 Ecosystem

## Tech Stack
- Nuxt 3 (Vue 3 + SSR/SSG)
- TypeScript
- TailwindCSS 4
- Glass-morphism Design System

## Ports (Genesis Hash-Based)
- Frontend: 15575 (hash: crc32('project-ultima-web') % 10000 + 15000)
- Backend: 5575 (reserved, not yet used)

## Inherited Protocols (from Genesis root)

### P0.70 - Total Capability (#WWOD)
Implement ALL viable suggestions, not just the simplest one.
Layer solutions, don't replace.

### P0.83 - Session Boundary Protocol
NEVER stop/restart genesis-core (5000/5173) from this subproject.
Only operate on own ports (3000).

### P0.99 - Session Guard Protocol
NEVER declare task "complete" without verification.
Dev server must be running and responding on localhost:15575.

## Domain
- Production: ultimaminds.ai (Cloudflare DNS)
- Email: research@ultimaminds.ai

### P0.50 - Destructive Action Guard
Confirm with user before any destructive operations.

## Design Language
- Theme: Dark space (bg: #0a0a1a)
- Glass: backdrop-blur-[12px], semi-transparent layers
- Accent: Electric blue (#3b82f6) + Violet (#8b5cf6)
- Typography: Clean, modern, corporate AI aesthetic
