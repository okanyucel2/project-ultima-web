<template>
  <footer class="border-t py-12" style="border-color: var(--border-subtle)">
    <div class="section-container">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <div class="w-6 h-6 rounded-md bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
            <span class="text-white font-bold text-[10px]">U</span>
          </div>
          <span class="text-sm text-txt-tertiary">
            UltimaMinds &middot; Autonomous Intelligence Research
          </span>
        </div>

        <!-- Links -->
        <div class="flex items-center gap-6">
          <a href="#" class="text-xs text-txt-tertiary/50 hover:text-txt-secondary transition-colors">Research Papers</a>
          <a href="#" class="text-xs text-txt-tertiary/50 hover:text-txt-secondary transition-colors">Ethics Board</a>
          <a href="#" class="text-xs text-txt-tertiary/50 hover:text-txt-secondary transition-colors">Governance</a>
        </div>

        <!-- Copyright -->
        <p class="text-xs font-mono text-txt-tertiary/30">
          &copy; 2026 Project Ultima. All emergence reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
