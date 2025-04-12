<template>
    <div class="task-form">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <input v-model="task.title" type="text" placeholder="Task Title" required class="form-input">
        </div>
        <div class="form-group">
          <textarea v-model="task.description" placeholder="Description (optional)" class="form-textarea"></textarea>
        </div>
        <div class="form-group">
          <input v-model="task.dueDate" type="date" class="form-input">
        </div>
        <div class="form-actions">
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isEditing ? 'Update Task' : 'Add Task' }}
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue'
  
  const props = defineProps({
    taskToEdit: {
      type: Object,
      default: null
    }
  })
  
  const emit = defineEmits(['submit'])
  
  const task = ref({
    title: '',
    description: '',
    dueDate: ''
  })
  
  const isSubmitting = ref(false)
  
  const isEditing = computed(() => !!props.taskToEdit)
  
  watch(() => props.taskToEdit, (newTask) => {
    if (newTask) {
      task.value = {
        title: newTask.title || '',
        description: newTask.description || '',
        dueDate: newTask.dueDate || ''
      }
    } else {
      task.value = { title: '', description: '', dueDate: '' }
    }
  }, { immediate: true })
  
  const handleSubmit = () => {
    if (isSubmitting.value) return
    isSubmitting.value = true
  
    const taskData = {
      title: task.value.title.trim(),
      description: task.value.description.trim(),
      dueDate: task.value.dueDate
    }
    emit('submit', taskData)
  
    if (!isEditing.value) {
      task.value = { title: '', description: '', dueDate: '' }
    }
  
    setTimeout(() => {
      isSubmitting.value = false
    }, 100)
  }
  </script>
  
  <style scoped>
  .task-form {
    padding: 0.75rem;
    background: #f0f0f0;
    border: 3px solid #1a1a1a;
    border-radius: 4px;
    box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.15);
    margin-top: 1rem;
    margin-left: 0.5rem; /* Ajusta a margem à esquerda */
    margin-right: 0.5rem; /* Ajusta a margem à direita */
    width: calc(100% - 1rem); /* Garante que o formulário não ultrapasse a borda */
    box-sizing: border-box; /* Inclui padding e borda na largura total */
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-input,
  .form-textarea {
    width: 100%;
    padding: 0.5rem;
    border: 2px solid #1a1a1a;
    border-radius: 4px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
    background: #fff;
    transition: border-color 0.3s ease;
    box-sizing: border-box; /* Garante que o padding não aumente a largura */
  }
  
  .form-input:focus,
  .form-textarea:focus {
    border-color: #5e8d93;
    outline: none;
  }
  
  .form-textarea {
    min-height: 80px;
  }
  
  .form-actions {
    display: flex;
    justify-content: center; /* centralizar botão*/
  }
  
  .submit-btn {
    background: #b22222;
    color: #fff;
    border: 2px solid #1a1a1a;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .submit-btn:hover {
    background: #8b1a1a;
  }
  
  .submit-btn:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
  </style>