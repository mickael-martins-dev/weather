import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './assets/custom.css';
import { LanguageProvider } from './contexts/LanguageContext';

createRoot(document.getElementById('root')!).render(
    <LanguageProvider>
        <App />
    </LanguageProvider>
)
