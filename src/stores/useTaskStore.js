import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTaskStore = defineStore('tasks', () => {
  const columns = ref([
    { id: 1, title: 'A Fazer', tasks: [], headerColor: '#4682b4', headerTextColor: '#1a1a1a' },
    { id: 2, title: 'Em Progresso', tasks: [], headerColor: '#4682b4', headerTextColor: '#1a1a1a' },
    { id: 3, title: 'Concluído', tasks: [], headerColor: '#4682b4', headerTextColor: '#1a1a1a' }
  ])

  const searchTerm = ref('')

  const filteredColumns = computed(() => {
    console.log('Computing filteredColumns with searchTerm:', searchTerm.value)
    console.log('Current columns:', columns.value)

    // Se o searchTerm estiver vazio, retorna todas as colunas
    if (!searchTerm.value.trim()) {
      console.log('No search term, returning all columns:', columns.value)
      return columns.value.map(column => ({ ...column, tasks: [...column.tasks] }))
    }

    const term = searchTerm.value.toLowerCase().trim()
    console.log('Search term (lowercase, trimmed):', term)

    // Filtra as colunas com base no termo de busca
    const filtered = columns.value
      .map(column => {
        // Verifica se o título da coluna corresponde ao termo
        const columnMatches = column.title && typeof column.title === 'string' && column.title.toLowerCase().includes(term)
        console.log(`Column "${column.title}" matches:`, columnMatches)

        // Filtra as tarefas com base no título ou descrição
        const filteredTasks = (column.tasks || []).filter(task => {
          const titleMatch = task.title && typeof task.title === 'string' && task.title.toLowerCase().includes(term)
          const descriptionMatch = task.description && typeof task.description === 'string' && task.description.toLowerCase().includes(term)
          console.log(`Task "${task.title}" - Title match: ${titleMatch}, Description match: ${descriptionMatch}`)
          return titleMatch || descriptionMatch
        })

        return {
          ...column,
          tasks: filteredTasks
        }
      })
      // Remove colunas que não correspondem ao termo e não têm tarefas correspondentes
      .filter(column => {
        const columnMatches = column.title && typeof column.title === 'string' && column.title.toLowerCase().includes(term)
        const hasMatchingTasks = column.tasks.length > 0
        console.log(`Column "${column.title}" - Keep column: ${columnMatches || hasMatchingTasks}`)
        return columnMatches || hasMatchingTasks
      })

    console.log('Filtered columns result:', filtered)
    return filtered
  })

  const addTask = (columnId, task) => {
    const column = columns.value.find(c => c.id === columnId)
    if (column) {
      column.tasks.push({
        id: Date.now(),
        ...task,
        createdAt: new Date().toISOString(),
        dueDate: task.dueDate || null,
        columnId: columnId
      })
      saveToLocalStorage()
    }
  }

  const deleteTask = (columnId, taskId) => {
    const column = columns.value.find(c => c.id === columnId)
    if (column) {
      column.tasks = column.tasks.filter(t => t.id !== taskId)
      saveToLocalStorage()
    }
  }

  const updateTask = (columnId, taskId, updatedTask) => {
    const column = columns.value.find(c => c.id === columnId)
    if (column) {
      const taskIndex = column.tasks.findIndex(t => t.id === taskId)
      if (taskIndex !== -1) {
        column.tasks[taskIndex] = { ...column.tasks[taskIndex], ...updatedTask }
        saveToLocalStorage()
      }
    }
  }

  const moveTask = ({ fromColumnId, toColumnId, taskId }) => {
    const fromColumn = columns.value.find(c => c.id === fromColumnId)
    const toColumn = columns.value.find(c => c.id === toColumnId)
    if (fromColumn && toColumn) {
      const taskIndex = fromColumn.tasks.findIndex(t => t.id === taskId)
      if (taskIndex !== -1) {
        const [task] = fromColumn.tasks.splice(taskIndex, 1)
        task.columnId = toColumnId
        toColumn.tasks.push(task)
        saveToLocalStorage()
      }
    }
  }

  const updateColumn = (columnId, updates) => {
    const column = columns.value.find(c => c.id === columnId)
    if (column) {
      Object.assign(column, updates)
      saveToLocalStorage()
    }
  }

  const addColumn = () => {
    const newId = columns.value.length ? Math.max(...columns.value.map(c => c.id)) + 1 : 1
    columns.value.push({
      id: newId,
      title: `Coluna ${newId}`,
      tasks: [],
      headerColor: '#4682b4',
      headerTextColor: '#1a1a1a'
    })
    saveToLocalStorage()
  }

  const deleteColumn = (columnId) => {
    const index = columns.value.findIndex(c => c.id === columnId)
    if (index !== -1) {
      columns.value.splice(index, 1)
      saveToLocalStorage()
    }
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('kanban-data', JSON.stringify(columns.value))
    console.log('Saved to localStorage:', columns.value)
  }

  const loadFromLocalStorage = () => {
    const data = localStorage.getItem('kanban-data')
    if (data) {
      const parsedData = JSON.parse(data)
      console.log('Loaded from localStorage:', parsedData)
      columns.value = parsedData
    }
    if (columns.value.length === 0) {
      addColumn()
    }
  }

  return { 
    columns, 
    searchTerm, 
    filteredColumns, 
    addTask, 
    deleteTask, 
    updateTask, 
    moveTask, 
    updateColumn, 
    addColumn, 
    deleteColumn, 
    loadFromLocalStorage 
  }
})