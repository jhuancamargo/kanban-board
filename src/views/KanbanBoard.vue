<template>
    <div class="board">
      <div v-if="columns.length === 0" class="empty-state">
        <p>No columns available.</p>
        <button @click="addNewColumn" class="add-column-btn">+ Add New Column</button>
      </div>
      <div v-else-if="filteredColumns.length === 0" class="empty-state">
        <p>No results found for "{{ searchTerm }}".</p>
      </div>
      <div v-else class="board-wrapper">
        <transition-group name="column" tag="div" class="columns">
          <KanbanColumn 
            v-for="column in filteredColumns" 
            :key="column.id"
            :column="column"
            @add-task="onAddTask"
            @move-task="moveTask"
          />
        </transition-group>
      </div>
    </div>
  </template>
  
  <script setup>
  import { storeToRefs } from 'pinia'
  import { useTaskStore } from '../stores/useTaskStore'
  import KanbanColumn from '../components/KanbanColumn.vue'
  import { watch } from 'vue'
  
  const taskStore = useTaskStore()
  const { columns, filteredColumns, searchTerm } = storeToRefs(taskStore)
  
  taskStore.loadFromLocalStorage()
  
  const onAddTask = (columnId, task) => {
    console.log(`Task added to column ${columnId}:`, task)
  }
  
  const moveTask = ({ fromColumnId, toColumnId, taskId }) => {
    taskStore.moveTask({ fromColumnId, toColumnId, taskId })
  }
  
  const addNewColumn = () => {
    taskStore.addColumn()
  }
  /* log por conta do erro da pesquisa */
  watch(filteredColumns, (newColumns) => {
    console.log('Colunas filtradas e atualizadas em Kanbanboard:', newColumns)
  }, { deep: true, immediate: true })
  </script>
  
  <style scoped>
  .board {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100vh;
    overflow: hidden;
  }
  
  .board-wrapper {
    flex: 1;
    overflow: auto;
    position: relative;
  }
  
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1rem;
    background: #f9fafb;
    border: 3px solid #1a1a1a;
    border-radius: 4px;
    box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.15);
    width: fit-content;
    align-self: center;
  }
  
  .empty-state p {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.2rem;
    color: #1a1a1a;
    margin-bottom: 1rem;
  }
  
  .add-column-btn {
    background: #5e8d93;
    border: 2px solid #1a1a1a;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1rem;
    color: #fff;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .add-column-btn:hover {
    background: #4a7276;
  }
  
  .columns {
    display: flex;
    flex-wrap: nowrap;
    gap: 1.5rem;
    padding: 1rem;
    min-width: fit-content;
    min-height: 100%;
  }
  
  @media (max-width: 768px) {
    .columns {
      flex-direction: column;
      align-items: center;
      min-height: fit-content;
    }
  }
  
  .column-enter-active,
  .column-leave-active {
    transition: all 0.3s ease;
  }
  
  .column-enter-from,
  .column-leave-to {
    opacity: 0;
    transform: translateX(-20px);
  }
  </style>