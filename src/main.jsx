import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { I18nProvider } from './i18n/I18nContext'
import { ToolRequestProvider } from './context/ToolRequestContext'
import { TaskProvider } from './context/TaskContext'
import { VehicleProvider } from './context/VehicleContext'
import { PhysicalInspectionProvider } from './context/PhysicalInspectionContext'
import { GamificationProvider } from './gamification/GamificationContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <AuthProvider>
          <GamificationProvider>
            <ToolRequestProvider>
              <TaskProvider>
                <VehicleProvider>
                  <PhysicalInspectionProvider>
                    <App />
                  </PhysicalInspectionProvider>
                </VehicleProvider>
              </TaskProvider>
            </ToolRequestProvider>
          </GamificationProvider>
        </AuthProvider>
      </I18nProvider>
    </BrowserRouter>
  </StrictMode>,
)
