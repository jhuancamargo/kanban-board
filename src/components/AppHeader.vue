<template>
    <header class="app-header">
      <h1>Nexum Kanban</h1>
      <div class="controls">
        <div class="search-container">
          <input 
            v-model="localSearchTerm" 
            type="text" 
            placeholder="Buscar tarefas, colunas..." 
            class="search-input"
            @input="debounceSearch"
          >
          <button v-if="localSearchTerm" @click="clearSearch" class="clear-btn">×</button>
        </div>
        <button class="btn" @click="toggleTheme">
          {{ darkMode ? '☀️ Light' : '🌙 Dark' }} Mode
        </button>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useTaskStore } from '../stores/useTaskStore'
  
  console.log('AppHeader: Início do script')
  
  const taskStore = useTaskStore()
  console.log('AppHeader: taskStore criado', taskStore)
  
  const { searchTerm } = storeToRefs(taskStore)
  console.log('AppHeader: searchTerm extraído', searchTerm?.value)
  
  const localSearchTerm = ref(searchTerm?.value || '')
  const darkMode = ref(false)
  

  console.log('AppHeader: localSearchTerm inicializado', localSearchTerm.value)
  
  let debounceTimeout = null
  
            const debounceSearch = () => {
    console.log('Input changed, localSearchTerm:', localSearchTerm.value)
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      if (searchTerm) {
        searchTerm.value = localSearchTerm.value
            console.log('Debounced search term set to:', searchTerm.value)
        } else {
        console.log('searchTerm não está definido!')
      }
    }, 300)
  }
  
  const clearSearch = () => {
        console.log('Clearing search, before:', searchTerm?.value)
     localSearchTerm.value = ''
    if (searchTerm) {
      searchTerm.value = ''
         console.log('Search term cleared, after:', searchTerm.value)
    } else {
      console.log('searchTerm não está definido!')
    }
  }
  
  const toggleTheme = () => {
        darkMode.value = !darkMode.value
    document.body.classList.toggle('dark-theme', darkMode.value)
  }
  </script>
  
  <style scoped>
  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    background: #4682b4;
    color: #fff;
    border: 3px solid #1a1a1a;
    box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.15);
    margin: 1rem;
  }
  
  .app-header h1 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 500;
    letter-spacing: 1px;
  }
  
  .controls {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  
  .search-container {
    position: relative;
  }
  
  .search-input {
    padding: 0.5rem;
    border: 2px solid #1a1a1a;
    border-radius: 4px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
    background: #fff;
    color: #1a1a1a;
    width: 200px;
    padding-right: 2rem;
  }
  
  .search-input:focus {
    outline: none;
    border-color: #5e8d93;
  }
  
  .clear-btn {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    background: #b22222;
    border: 2px solid #1a1a1a;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .clear-btn:hover {
    background: #8b1a1a;
  }
  
  .btn {
    background: #d3d9dc;
    border: 2px solid #1a1a1a;
    color: #1a1a1a;
    padding: 0.5rem 1rem;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .btn:hover {
    background: #b0bec5;
  }
  </style>