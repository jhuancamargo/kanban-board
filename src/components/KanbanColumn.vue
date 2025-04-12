<template>
    <div class="column">
      <div class="column-header" :style="{ backgroundColor: column.headerColor }">
        <div v-if="!isEditingTitle" class="header-content">
          <h3 @click="startEditingTitle" :style="{ color: column.headerTextColor }">
            {{ column.title }}
          </h3>
          <div class="header-actions">
            <input 
              type="color" 
              v-model="newColor" 
              @change="updateColumnColor" 
              class="color-picker"
              title="Change header color"
            >
            <input 
              type="color" 
              v-model="newTextColor" 
              @change="updateColumnTextColor" 
              class="color-picker"
              title="Change text color"
            >
            <button @click="addNewColumn" class="action-btn" title="Add new column">+</button>
            <button @click="deleteThisColumn" class="action-btn delete-btn" title="Delete column">×</button>
          </div>
        </div>
        <div v-else class="header-content">
          <input 
            type="text" 
            v-model="newTitle" 
            @blur="updateColumnTitle" 
            @keyup.enter="updateColumnTitle" 
            class="title-input"
            ref="titleInput"
          >
        </div>
      </div>
      <draggable 
        :list="localTasks"
        group="tasks"
        item-key="id"
        @change="handleDrag"
        animation="150"
      >
        <template #item="{ element }">
          <transition-group name="task" tag="div">
            <TaskCard 
              :key="element.id" 
              :task="element" 
              :column-id="column.id" 
              @edit-task="openEditModal" 
            />
          </transition-group>
        </template>
      </draggable>
      <TaskForm @submit="handleAddTask" />
      <TaskForm 
        v-if="editingTask" 
        :task-to-edit="editingTask" 
        @submit="handleUpdateTask" 
        key="edit-form"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, nextTick, watch } from 'vue'
  import draggable from 'vuedraggable'
  import TaskCard from './TaskCard.vue'
  import TaskForm from './TaskForm.vue'
  import { useTaskStore } from '../stores/useTaskStore'
  
  const props = defineProps({ column: Object })
  const emit = defineEmits(['add-task', 'move-task'])
  const taskStore = useTaskStore()
  
  const editingTask = ref(null)
  const isEditingTitle = ref(false)
  const newTitle = ref(props.column.title)
  const newColor = ref(props.column.headerColor || '#4682b4')
  const newTextColor = ref(props.column.headerTextColor || '#1a1a1a')
  const titleInput = ref(null)
  const localTasks = ref([...props.column.tasks])
  
  watch(() => props.column.tasks, (newTasks) => {
    console.log(`Tasks updated in column ${props.column.title}:`, newTasks)
    localTasks.value = [...newTasks]
  }, { deep: true, immediate: true })
  
  const startEditingTitle = () => {
    isEditingTitle.value = true
    newTitle.value = props.column.title
    nextTick(() => {
      titleInput.value.focus()
    })
  }
  
  const updateColumnTitle = () => {
    if (newTitle.value.trim()) {
      taskStore.updateColumn(props.column.id, { title: newTitle.value.trim() })
    }
    isEditingTitle.value = false
  }
  
  const updateColumnColor = () => {
    taskStore.updateColumn(props.column.id, { headerColor: newColor.value })
  }
  
  const updateColumnTextColor = () => {
    taskStore.updateColumn(props.column.id, { headerTextColor: newTextColor.value })
  }
  
  const addNewColumn = () => {
    taskStore.addColumn()
  }
  
  const deleteThisColumn = () => {
    taskStore.deleteColumn(props.column.id)
  }
  
  const handleAddTask = (task) => {
    taskStore.addTask(props.column.id, task)
    emit('add-task', props.column.id, task)
  }
  
  const handleUpdateTask = (updatedTask) => {
    if (editingTask.value) {
      taskStore.updateTask(props.column.id, editingTask.value.id, updatedTask)
      editingTask.value = null
    }
  }
  
  const openEditModal = (task) => {
    editingTask.value = { ...task }
  }
  
  const handleDrag = (evt) => {
    if (evt.added) {
      const { element } = evt.added
      taskStore.moveTask({
        fromColumnId: element.columnId || props.column.id,
        toColumnId: props.column.id,
        taskId: element.id
      })
      emit('move-task', {
        fromColumnId: element.columnId || props.column.id,
        toColumnId: props.column.id,
        taskId: element.id
      })
      element.columnId = props.column.id
    }
  }
  </script>
  
  <style scoped>
  .column {
    background: #f9fafb;
    padding: 1rem;
    border: 3px solid #1a1a1a;
    border-radius: 4px;
    width: 300px;
    flex-shrink: 0;
    box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.15);
    min-height: 400px;
  }
  
  .column-header {
    padding: 0.5rem;
    border-bottom: 3px solid #1a1a1a;
    text-align: center;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .header-actions {
    display: flex;
    gap: 0.3rem;
  }
  
  .column h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 1px;
    cursor: pointer;
  }
  
  .title-input {
    width: 70%;
    padding: 0.3rem;
    border: 2px solid #1a1a1a;
    border-radius: 4px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1rem;
    background: #fff;
  }
  
  .color-picker {
    width: 24px;
    height: 24px;
    border: 2px solid #1a1a1a;
    border-radius: 4px;
    cursor: pointer;
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
  
  .task-enter-active,
  .task-leave-active {
    transition: all 0.3s ease;
  }
  
  .task-enter-from,
  .task-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  </style>