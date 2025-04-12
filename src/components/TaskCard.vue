<template>
    <div class="task-card" :class="{ 'highlight': highlight }">
      <div class="task-header">
        <h4>{{ task.title }}</h4>
        <div class="task-actions">
          <button @click="editTask" class="action-btn">✎</button>
          <button @click="deleteTask" class="action-btn delete-btn">×</button>
        </div>
      </div>
      <p v-if="task.description" class="task-description">{{ task.description }}</p>
      <p v-if="task.dueDate" class="task-due-date">
        Due: {{ formatDate(task.dueDate) }}
      </p>
      <p class="task-created-at">Created: {{ formatDate(task.createdAt) }}</p>
    </div>
  </template>
  
  <script setup>
  import { useTaskStore } from '../stores/useTaskStore'
  
  const props = defineProps({
    task: Object,
    columnId: Number,
    highlight: Boolean
  })
  const emit = defineEmits(['edit-task'])
  
  const taskStore = useTaskStore()
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',   
      day: 'numeric'
    })
  }
  
  const editTask = () => {
    emit('edit-task', props.task)
  }
  
  const deleteTask = () => {
    taskStore.deleteTask(props.columnId, props.task.id)
  }
  </script>
  
  <style scoped>
  .task-card {
    background: #fff;
    padding: 0.8rem;
    margin-bottom: 0.5rem;
    border: 2px solid #1a1a1a;
    border-radius: 4px;
    box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.15);
  }
  
  .task-card.highlight {
    border-color: #5e8d93;
    box-shadow: 2px 2px 0px #5e8d93;
  }
  
  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .task-header h4 {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
  }
  
  .task-actions {
    display: flex;
    gap: 0.3rem;
  }
  
  .task-description {
    margin: 0.5rem 0;
    font-size: 0.9rem;
    color: #4a4a4a;
  }
  
  .task-due-date,
  .task-created-at {
    font-size: 0.8rem;
    color: #6b7280;
    margin: 0.2rem 0;
  }
  
  .action-btn {
    background: #5e8d93;
    border: 2px solid #1a1a1a;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8rem;
    color: #fff;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .action-btn:hover {
    background: #4a7276;
  }
  
  .delete-btn {
    background: #b22222;
  }
  
  .delete-btn:hover {
    background: #8b1a1a;
  }
  </style>