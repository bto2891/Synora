export const ROLES = {
  site_manager: {
    id: 'site_manager',
    label: 'Site Manager',
    accent: '#60a5fa',
    accentBg: 'rgba(96,165,250,0.12)',
  },
  supervisor: {
    id: 'supervisor',
    label: 'Supervisor',
    accent: '#34d399',
    accentBg: 'rgba(52,211,153,0.12)',
  },
  technician: {
    id: 'technician',
    label: 'Technician',
    accent: '#e2e8f0',
    accentBg: 'rgba(226,232,240,0.10)',
  },
  warehouse_manager: {
    id: 'warehouse_manager',
    label: 'Warehouse Manager',
    accent: '#fbbf24',
    accentBg: 'rgba(251,191,36,0.12)',
  },
  project_manager: {
    id: 'project_manager',
    label: 'Project Manager',
    accent: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.12)',
  },
}

export const ROLE_LIST = Object.values(ROLES)

export const DEMO_USERS = {
  site_manager: {
    id: 'u-site',
    name: 'Olivia Park',
    initials: 'OP',
    role: 'site_manager',
    project: 'GM Silao Project',
    zone: 'All zones',
  },
  supervisor: {
    id: 'u-sup',
    name: 'Marco Alvarez',
    initials: 'MA',
    role: 'supervisor',
    project: 'GM Silao Project',
    zone: 'Zone A',
  },
  technician: {
    id: 'u-tech',
    name: 'Diego Ramos',
    initials: 'DR',
    role: 'technician',
    project: 'GM Silao Project',
    zone: 'Zone A',
  },
  warehouse_manager: {
    id: 'u-wh',
    name: 'Isabela Cruz',
    initials: 'IC',
    role: 'warehouse_manager',
    project: 'GM Silao Project',
    zone: 'Warehouse',
  },
  project_manager: {
    id: 'u-pm',
    name: 'Hector Beltran',
    initials: 'HB',
    role: 'project_manager',
    project: 'GM Silao Project',
    zone: 'All zones',
  },
}
