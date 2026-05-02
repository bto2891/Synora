import { createContext, useContext, useState } from 'react'
import { PHYSICAL_INSPECTIONS } from '../data/sample'

const CTX = createContext(null)

let piCounter = 3

export function PhysicalInspectionProvider({ children }) {
  const [inspections, setInspections] = useState(PHYSICAL_INSPECTIONS)

  function recordInspection({ taskId, task, task_es, technician, zone, result, notes, notes_es, inspectedBy }) {
    const id = `PI-${String(piCounter++).padStart(2, '0')}`
    setInspections((prev) => [
      ...prev,
      { id, taskId, task, task_es, technician, zone, result, notes, notes_es, inspectedBy, inspectedAt: new Date().toISOString() },
    ])
  }

  function getForTask(taskId) {
    return inspections.find((i) => i.taskId === taskId) ?? null
  }

  return (
    <CTX.Provider value={{ inspections, recordInspection, getForTask }}>
      {children}
    </CTX.Provider>
  )
}

export function usePhysicalInspection() {
  const ctx = useContext(CTX)
  if (!ctx) throw new Error('usePhysicalInspection must be inside PhysicalInspectionProvider')
  return ctx
}
