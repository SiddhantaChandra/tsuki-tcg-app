import './globals.css'
import { DarkModeProvider } from './components/common/DarkModeContext'
import { AuthProvider } from './components/common/AuthContext'
import AuthModals from './components/common/auth/AuthModals'

export const metadata = {
  title: 'Tsuki TCG - Trading Card Collection',
  description: 'Discover rare cards & build your ultimate collection. Premium TCG marketplace with authenticated cards and competitive prices.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <DarkModeProvider>
          <AuthProvider>
            {children}
            <AuthModals />
          </AuthProvider>
        </DarkModeProvider>
      </body>
    </html>
  )
} 