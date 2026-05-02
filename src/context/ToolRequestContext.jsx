import { createContext, useContext, useState } from 'react'
import { TOOL_REQUESTS } from '../data/sample'

const ToolRequestContext = createContext(null)

export function ToolRequestProvider({ children }) {
  const [requests, setRequests] = useState(TOOL_REQUESTS)

  const requestTool = ({ item, item_es, sku, qty, taskId, task, task_es, technicianId, technician, technicianInitials }) => {
    setRequests((prev) => [
      {
        id: `TR-${String(Date.now()).slice(-5)}`,
        item,
        item_es: item_es || item,
        sku,
        qty,
        technicianId,
        technician,
        technicianInitials,
        taskId,
        task,
        task_es: task_es || task,
        status: 'pending',
        requestedAt: new Date().toISOString(),
        deliveredAt: null,
        returnedAt: null,
      },
      ...prev,
    ])
  }

  const markDelivered = (id) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: 'delivered', deliveredAt: new Date().toISOString() } : r
      )
    )
  }

  const initiateReturn = (id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'return_pending' } : r))
    )
  }

  const confirmReturn = (id) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: 'returned', returnedAt: new Date().toISOString() } : r
      )
    )
  }

  return (
    <ToolRequestContext.Provider value={{ requests, requestTool, markDelivered, initiateReturn, confirmReturn }}>
      {children}
    </ToolRequestContext.Provider>
  )
}

export function useToolRequests() {
  const ctx = useContext(ToolRequestContext)
  if (!ctx) throw new Error('useToolRequests must be used within ToolRequestProvider')
  return ctx
}
