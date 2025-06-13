import './globals.css'
import { DarkModeProvider } from './components/common/DarkModeContext'

export const metadata = {
  title: 'Tsuki TCG - Trading Card Collection',
  description: 'Discover rare cards & build your ultimate collection. Premium TCG marketplace with authenticated cards and competitive prices.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DarkModeProvider>
          {children}
        </DarkModeProvider>
      </body>
    </html>
  )
} 