import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { TASKS } from '../data/sample'

const TaskContext = createContext(null)

const BASE_TASKS = [
  ...TASKS.map((t) => ({
    assignedBy: 'Marco Alvarez',
    evidencePhoto: ['pending_approval', 'done'].includes(t.status) ? '#134e4a' : null,
    rejectReason: null,
    priority: t.priority || 'normal',
    createdAt: '2026-04-28T07:00:00',
    ...t,
  })),
  // Pre-seeded Zone A review task so supervisor has something to review on load
  {
    id: 'T-2407',
    name: 'Cable tray install row 3',
    name_es: 'Instalar charola fila 3',
    zone: 'Zone A',
    assignee: 'Lucia Mendez',
    assignedBy: 'Marco Alvarez',
    status: 'pending_approval',
    priority: 'normal',
    elapsed: '2h 15m',
    photo: '#0f172a',
    evidencePhoto: '#134e4a',
    instructions: 'Secure cable tray brackets every 400 mm with M6 screws and lock washers. Route power cables on the left, signal cables on the right.',
    instructions_es: 'Fija los soportes de charola cada 400 mm con tornillos M6 y arandelas de seguridad. Cables de potencia a la izquierda, señal a la derecha.',
    rejectReason: null,
    createdAt: '2026-04-28T06:30:00',
  },
]

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(BASE_TASKS)
  const idRef = useRef(2430)

  const createTask = useCallback(({ name, zone, assignee, assignedBy, priority, instructions }) => {
    const id = `T-${idRef.current++}`
    setTasks((prev) => [
      {
        id,
        name,
        name_es: name,
        zone,
        assignee,
        assignedBy,
        status: 'pending',
        priority: priority || 'normal',
        elapsed: '—',
        photo: '#1d2230',
        evidencePhoto: null,
        instructions: instructions || '',
        instructions_es: instructions || '',
        rejectReason: null,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ])
    return id
  }, [])

  const startTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'in_progress', elapsed: '0m' } : t))
    )
  }, [])

  const submitTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: 'pending_approval', evidencePhoto: '#134e4a' } : t
      )
    )
  }, [])

  const approveTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'done' } : t))
    )
  }, [])

  const rejectTask = useCallback((id, reason) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: 'rework', rejectReason: reason } : t
      )
    )
  }, [])

  return (
    <TaskContext.Provider value={{ tasks, createTask, startTask, submitTask, approveTask, rejectTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error('useTasks must be used within TaskProvider')
  return ctx
}
