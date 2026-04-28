export const ZONES = ['Zone A', 'Zone B', 'Zone C']

export const TECHNICIANS = [
  { id: 't1', name: 'Diego Ramos', initials: 'DR', zone: 'Zone A', currentTask: 'Robot KUKA-12 cabling', activeFor: '1h 24m', status: 'green', tasksDone: 38 },
  { id: 't2', name: 'Lucia Mendez', initials: 'LM', zone: 'Zone A', currentTask: 'Sensor calibration ST-04', activeFor: '42m', status: 'green', tasksDone: 31 },
  { id: 't3', name: 'Pedro Solis', initials: 'PS', zone: 'Zone A', currentTask: 'Idle', activeFor: '12m', status: 'amber', tasksDone: 22 },
  { id: 't4', name: 'Andrea Vega', initials: 'AV', zone: 'Zone B', currentTask: 'Welding cell weld-test', activeFor: '2h 03m', status: 'green', tasksDone: 41 },
  { id: 't5', name: 'Tomas Ortiz', initials: 'TO', zone: 'Zone B', currentTask: 'Awaiting parts', activeFor: '38m', status: 'red', tasksDone: 17 },
  { id: 't6', name: 'Ana Castillo', initials: 'AC', zone: 'Zone C', currentTask: 'PLC firmware load', activeFor: '55m', status: 'green', tasksDone: 29 },
  { id: 't7', name: 'Nora Vidal', initials: 'NV', zone: 'Zone C', currentTask: 'QA paperwork', activeFor: '18m', status: 'amber', tasksDone: 14 },
]

export const TASKS = [
  { id: 'T-2418', name: 'Cabling robot KUKA-12', zone: 'Zone A', assignee: 'Diego Ramos', status: 'in_progress', priority: 'urgent', elapsed: '1h 24m', photo: '#1f2937', instructions: 'Route the main power harness through channel B-3 and connect to the J1 port. Use torque 8 Nm on the connector clamp.' },
  { id: 'T-2419', name: 'Calibrate sensor ST-04', zone: 'Zone A', assignee: 'Lucia Mendez', status: 'in_progress', priority: 'normal', elapsed: '42m', photo: '#0f172a' },
  { id: 'T-2412', name: 'Replace pneumatic valve', zone: 'Zone A', assignee: 'Pedro Solis', status: 'overdue', priority: 'urgent', elapsed: '3h 12m', photo: '#1e293b' },
  { id: 'T-2420', name: 'Weld test fixture WL-7', zone: 'Zone B', assignee: 'Andrea Vega', status: 'in_progress', priority: 'normal', elapsed: '2h 03m', photo: '#1f2937' },
  { id: 'T-2421', name: 'Bolt down station ST-09', zone: 'Zone B', assignee: 'Tomas Ortiz', status: 'pending', priority: 'normal', elapsed: '—', photo: '#0f172a' },
  { id: 'T-2422', name: 'Load PLC firmware v2.4', zone: 'Zone C', assignee: 'Ana Castillo', status: 'in_progress', priority: 'normal', elapsed: '55m', photo: '#1e293b' },
  { id: 'T-2410', name: 'QA sign-off cell C-01', zone: 'Zone C', assignee: 'Nora Vidal', status: 'pending_approval', priority: 'normal', elapsed: '4h 11m', photo: '#1f2937' },
  { id: 'T-2401', name: 'Install safety fence panel', zone: 'Zone A', assignee: 'Diego Ramos', status: 'done', priority: 'normal', elapsed: '1h 02m', photo: '#0f172a' },
  { id: 'T-2398', name: 'Verify e-stop circuit', zone: 'Zone A', assignee: 'Diego Ramos', status: 'done', priority: 'normal', elapsed: '34m', photo: '#1e293b' },
]

export const PENDING_APPROVALS = [
  { id: 'A-01', taskId: 'T-2410', task: 'QA sign-off cell C-01', technician: 'Nora Vidal', zone: 'Zone A', submitted: '12 min ago', photo: '#1f2937' },
  { id: 'A-02', taskId: 'T-2407', task: 'Cable tray install row 3', technician: 'Lucia Mendez', zone: 'Zone A', submitted: '38 min ago', photo: '#0f172a' },
  { id: 'A-03', taskId: 'T-2403', task: 'Sensor mount KUKA-08', technician: 'Diego Ramos', zone: 'Zone A', submitted: '1h 04m ago', photo: '#1e293b' },
]

export const WAREHOUSE_REQUESTS = [
  { id: 'R-91', requester: 'Diego Ramos', item: 'M8 hex bolts', qty: 24, taskId: 'T-2418', requested: '8 min ago' },
  { id: 'R-92', requester: 'Andrea Vega', item: 'Welding tip 1.6mm', qty: 4, taskId: 'T-2420', requested: '22 min ago' },
  { id: 'R-93', requester: 'Ana Castillo', item: 'Ethernet cable Cat6 5m', qty: 2, taskId: 'T-2422', requested: '40 min ago' },
  { id: 'R-94', requester: 'Tomas Ortiz', item: 'Pneumatic valve VL-3', qty: 1, taskId: 'T-2421', requested: '1h 10m ago' },
]

export const WAREHOUSE_ITEMS = [
  { sku: 'BOLT-M8', name: 'M8 hex bolts', stock: 412, threshold: 100, location: 'A-12' },
  { sku: 'CBL-CAT6', name: 'Ethernet cable Cat6', stock: 18, threshold: 25, location: 'B-04' },
  { sku: 'WTIP-16', name: 'Welding tip 1.6mm', stock: 6, threshold: 10, location: 'C-22' },
  { sku: 'VLV-VL3', name: 'Pneumatic valve VL-3', stock: 0, threshold: 4, location: 'C-08' },
  { sku: 'SNS-PRX', name: 'Proximity sensor', stock: 47, threshold: 20, location: 'A-03' },
  { sku: 'HRN-PWR', name: 'Power harness 4ft', stock: 92, threshold: 30, location: 'B-19' },
]

export const CHANNELS = [
  { id: 'zone-a', name: 'Zone A', kind: 'zone', last: 'Diego: Robot KUKA-12 needs M8 bolts', time: '2 min', unread: 3 },
  { id: 'zone-b', name: 'Zone B', kind: 'zone', last: 'Andrea: Weld test passed on WL-7', time: '14 min', unread: 0 },
  { id: 'zone-c', name: 'Zone C', kind: 'zone', last: 'Ana: PLC v2.4 loaded successfully', time: '38 min', unread: 1 },
  { id: 'supervisors', name: 'Supervisors', kind: 'group', last: 'Marco: 3 approvals pending in Zone A', time: '1h', unread: 2 },
  { id: 'warehouse', name: 'Warehouse', kind: 'group', last: 'Isabela: New shipment arrived bay 4', time: '2h', unread: 0 },
]

export const MESSAGES = {
  'zone-a': [
    { id: 'm1', author: 'Marco Alvarez', initials: 'MA', text: 'Morning team — focus on KUKA-12 today.', time: '08:02', mine: false },
    { id: 'm2', author: 'Diego Ramos', initials: 'DR', text: 'On it. Starting cable harness now.', time: '08:05', mine: false },
    { id: 'm3', author: 'AI Assistant', text: 'Reminder: torque spec for J1 connector is 8 Nm.', time: '08:06', ai: true },
    { id: 'm4', author: 'Lucia Mendez', initials: 'LM', text: 'Sensor ST-04 calibration complete, photo uploaded.', time: '08:41', mine: false },
    { id: 'm5', author: 'Diego Ramos', initials: 'DR', text: 'Need 24x M8 bolts at station 12.', time: '08:48', mine: true },
    { id: 'm6', author: 'AI Assistant', text: 'Request sent to warehouse (R-91). ETA 10 min.', time: '08:48', ai: true },
  ],
  'zone-b': [
    { id: 'm1', author: 'Andrea Vega', initials: 'AV', text: 'Weld test passed on WL-7.', time: '09:14', mine: false },
  ],
  'zone-c': [
    { id: 'm1', author: 'Ana Castillo', initials: 'AC', text: 'PLC v2.4 loaded successfully.', time: '08:38', mine: false },
  ],
  supervisors: [
    { id: 'm1', author: 'Marco Alvarez', initials: 'MA', text: '3 approvals pending in Zone A.', time: '09:00', mine: false },
  ],
  warehouse: [
    { id: 'm1', author: 'Isabela Cruz', initials: 'IC', text: 'New shipment arrived bay 4.', time: '07:50', mine: false },
  ],
}

export const PROJECT_STATS = {
  name: 'GM Silao',
  week: 3,
  totalWeeks: 12,
  progress: 31,
  tasksCompleted: 248,
  tasksTotal: 812,
  reworkPercent: 4.2,
  avgRobotMinutes: 184,
  robotsValidated: 14,
  robotsTotal: 48,
  zoneProgress: [
    { zone: 'Zone A', percent: 42 },
    { zone: 'Zone B', percent: 28 },
    { zone: 'Zone C', percent: 21 },
  ],
  topTechnicians: [
    { name: 'Andrea Vega', tasksDone: 41, score: 96 },
    { name: 'Diego Ramos', tasksDone: 38, score: 94 },
    { name: 'Lucia Mendez', tasksDone: 31, score: 91 },
    { name: 'Ana Castillo', tasksDone: 29, score: 88 },
  ],
}

export const SITE_STATS = {
  activeTechnicians: 7,
  tasksToday: 24,
  reworks: 3,
  robotsValidated: '14 / 48',
}
