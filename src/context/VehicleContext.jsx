import { createContext, useContext, useState } from 'react'
import { VEHICLES, VEHICLE_REQUESTS } from '../data/sample'

const CTX = createContext(null)

let reqCounter = 7

export function VehicleProvider({ children }) {
  const [vehicles, setVehicles] = useState(VEHICLES)
  const [requests, setRequests] = useState(VEHICLE_REQUESTS)

  function requestVehicle({ vehicleId, vehicle, technicianId, technician, technicianInitials, purpose, purpose_es, taskId }) {
    const id = `VR-${String(++reqCounter).padStart(2, '0')}`
    setRequests((prev) => [
      { id, vehicleId, vehicle, technicianId, technician, technicianInitials, purpose, purpose_es, taskId, status: 'pending', requestedAt: new Date().toISOString(), approvedAt: null, returnedAt: null },
      ...prev,
    ])
    setVehicles((prev) =>
      prev.map((v) => v.id === vehicleId ? { ...v, status: 'reserved' } : v)
    )
  }

  function approveRequest(id) {
    const req = requests.find((r) => r.id === id)
    if (!req) return
    setRequests((prev) =>
      prev.map((r) => r.id === id ? { ...r, status: 'approved', approvedAt: new Date().toISOString() } : r)
    )
    setVehicles((prev) =>
      prev.map((v) => v.id === req.vehicleId ? { ...v, status: 'in_use', assignedTo: req.technician, assignedToInitials: req.technicianInitials } : v)
    )
  }

  function rejectRequest(id) {
    const req = requests.find((r) => r.id === id)
    if (!req) return
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: 'rejected' } : r))
    setVehicles((prev) =>
      prev.map((v) => v.id === req.vehicleId ? { ...v, status: 'available' } : v)
    )
  }

  function returnVehicle(id) {
    const req = requests.find((r) => r.id === id)
    if (!req) return
    setRequests((prev) =>
      prev.map((r) => r.id === id ? { ...r, status: 'returned', returnedAt: new Date().toISOString() } : r)
    )
    setVehicles((prev) =>
      prev.map((v) => v.id === req.vehicleId ? { ...v, status: 'available', assignedTo: null, assignedToInitials: null } : v)
    )
  }

  return (
    <CTX.Provider value={{ vehicles, requests, requestVehicle, approveRequest, rejectRequest, returnVehicle }}>
      {children}
    </CTX.Provider>
  )
}

export function useVehicles() {
  const ctx = useContext(CTX)
  if (!ctx) throw new Error('useVehicles must be inside VehicleProvider')
  return ctx
}
