import '../frontend/styles/globals.css';
import { AuthProvider } from '../frontend/hooks/useAuth';

export const metadata = {
  title: 'Chat Web AI',
  description: 'Projet Chat Web avec Next.js et SQLite',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
