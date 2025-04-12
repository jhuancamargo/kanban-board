<template>
  <div class="app">
    <AppHeader />
    <KanbanBoard />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import KanbanBoard from './views/KanbanBoard.vue'
</script>




<style>
/* root - liberadade para alteração pessoal  */
:root { 
  --primary: #b22222; /* Vermelho escuro */
  --secondary: #5e8d93; /* Azul acinzentado */
  --background: #e8ecef; /* Cinza claro */
  --dark: #1a1a1a; /* Preto para texto */
  --light: #f9fafb; /* Branco suave para cards */
  --shadow: 3px 3px 0px rgba(0, 0, 0, 0.15); /* Sombra mais sutil */
}

body {
  font-family: 'IBM Plex Mono', monospace; /* Fonte retro, mas legível */
  margin: 0;
  background: var(--background);
  background-image: linear-gradient(#d3d9dc 1px, transparent 1px),
                    linear-gradient(to right, #d3d9dc 1px, transparent 1px);
  background-size: 30px 30px; /* Grid mais discreto */
  color: var(--dark);
}

body.dark-theme {
  background: #2d2d2d;
  background-image: linear-gradient(#4a4a4a 1px, transparent 1px),
                    linear-gradient(to right, #4a4a4a 1px, transparent 1px);
  background-size: 30px 30px;
  color: #e8ecef;
}

body.dark-theme .column,
body.dark-theme .task-card,
body.dark-theme .task-form {
  background: #4a4a4a;
  color: #e8ecef;
}
</style>