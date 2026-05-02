import { Zap, Shield, Star, Award, Users, Trophy } from 'lucide-react'

export const BADGE_DEFS = [
  { id: 'speed_runner',  label: 'Speed Runner',  label_es: 'Velocista',     icon: Zap,    color: '#fbbf24', desc: '5 tasks in one day',           desc_es: '5 tareas en un día' },
  { id: 'reliable',      label: 'Reliable',       label_es: 'Confiable',     icon: Shield, color: '#60a5fa', desc: '3-day task streak',            desc_es: 'Racha de 3 días' },
  { id: 'first_blood',   label: 'First Task',     label_es: 'Primera tarea', icon: Star,   color: '#34d399', desc: 'Completed first task',         desc_es: 'Completó la primera tarea' },
  { id: 'perfectionist', label: 'Perfectionist',  label_es: 'Perfeccionista', icon: Award,  color: '#a78bfa', desc: '10 tasks with no rework',      desc_es: '10 tareas sin retrabajo' },
  { id: 'teamplayer',    label: 'Team Player',    label_es: 'Colaborador',   icon: Users,  color: '#fb923c', desc: 'Assisted 5 peers',             desc_es: 'Ayudó a 5 compañeros' },
  { id: 'century',       label: 'Century',        label_es: 'Centenario',    icon: Trophy, color: '#f43f5e', desc: '100 tasks completed',          desc_es: '100 tareas completadas' },
]
