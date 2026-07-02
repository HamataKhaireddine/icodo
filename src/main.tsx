import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { VisitorLocaleProvider } from './context/VisitorLocaleContext'
import './i18n'
import './index.css'
import './codo-theme.css'
import './premium.css'
import i18n from './i18n'
import App from './App.tsx'
import './App.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <VisitorLocaleProvider>
        <App />
      </VisitorLocaleProvider>
    </I18nextProvider>
  </StrictMode>,
)
